import pb from '@/api/pocketbase';
import { useQuery } from '@tanstack/react-query';

// export function Verification(id) {

//   const [isVerification, setIsVerification] = useState(false);

//   useEffect(() => {
//     async function checkVerified() {
//       const userData = await pb.collection('user').getOne(id);
//       setIsVerification(userData.verified);
//     }

//     checkVerified();
//   }, [id]);

//   return { isVerification };
// }

export function useVerification(id = undefined) {
  const checkVerified = async () => {
    const userData = await pb.collection('user').getOne(id);
    return userData.verified;
  };

  return useQuery({
    queryFn: checkVerified,
    queryKey: ['check-verified', id],
    staleTime: 2000,
    cacheTime: 2000,
  });
}
