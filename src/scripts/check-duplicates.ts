import { getPayload } from 'payload';
import config from '../payload.config';
import 'dotenv/config';

async function checkSubscribers() {
  const payload = await getPayload({ config });
  
  const subscribers = await payload.find({
    collection: 'subscribers',
    limit: 100,
  });

  console.log('Total Subscribers found:', subscribers.totalDocs);
  console.log('Subscriber Emails:', subscribers.docs.map(d => d.email));

  const duplicates = subscribers.docs.filter((d, i) => 
    subscribers.docs.findIndex(sd => sd.email === d.email) !== i
  );

  if (duplicates.length > 0) {
    console.log('WARNING: Duplicates found!', duplicates.map(d => d.email));
  } else {
    console.log('No duplicates found in the list.');
  }

  process.exit(0);
}

checkSubscribers();
