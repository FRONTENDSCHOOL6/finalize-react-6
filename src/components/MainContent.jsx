import { NavLink } from 'react-router-dom';
import pb from '@/api/pocketbase';
import { useState } from 'react';
import { useEffect } from 'react';
// import PocketBase from 'pocketbase';

export default function MainContent({ src, alt, title }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    // const pb = new PocketBase('https://react-mission.pockethost.io');

    async function getContentList() {
      try {
        setStatus('loading');
        const contentList = await pb.collection('content').getFullList();
        console.log('contentList:', contentList);
        setData(contentList);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    }

    getContentList();
  }, []);

  return (
    <>
      {data && data.map((item) => <p key={item.id}>{item.content}</p>)}
      <li className="w-1/3 border-2 border-slate-300 border-solid rounded">
        <NavLink to="/content">
          <figure>
            <img src={src} alt={alt} />
            <figcaption className="py-4 pl-4 overflow-hidden text-ellipsis whitespace-nowrap">
              {title}
            </figcaption>
          </figure>
        </NavLink>
      </li>
    </>
  );
}
