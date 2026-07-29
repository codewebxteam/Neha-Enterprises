import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, update } from 'firebase/database';
import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value) env[key.trim()] = value.join('=').trim().replace(/['"]/g, '');
});

const app = initializeApp({
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: env.VITE_FIREBASE_DATABASE_URL,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID
});

const db = getDatabase(app);

async function wipeDummyDates() {
    console.log('Fetching orders...');
    const snapshot = await get(ref(db, 'orders'));
    if (!snapshot.exists()) return;
    
    const orders = snapshot.val();
    let updates = {};
    let count = 0;
    
    for (const [key, order] of Object.entries(orders)) {
        if (order.timeline && Array.isArray(order.timeline)) {
            let changed = false;
            const newTimeline = order.timeline.map((step, idx) => {
                // If it's a step after 'Pending' (idx > 0)
                if (idx > 0 && step.date) {
                    changed = true;
                    // Wipe the dummy date
                    return { status: step.status, desc: step.desc, completed: false };
                }
                return step;
            });
            
            if (changed) {
                updates[`orders/${key}/timeline`] = newTimeline;
                // Also reset status to 'Pending' so the user can test the transition again
                updates[`orders/${key}/status`] = 'Pending';
                count++;
            }
        }
    }
    
    if (count > 0) {
        console.log(`Wiped dummy dates for ${count} orders...`);
        await update(ref(db), updates);
        console.log('Done!');
    }
    process.exit(0);
}

wipeDummyDates().catch(console.error);
