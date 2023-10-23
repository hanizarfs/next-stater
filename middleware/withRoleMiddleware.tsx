import { useRouter } from 'next/navigation';

const withRoleMiddleware = (allowedRole: string, Component: React.FC) => {
  return () => {
    const router = useRouter();
    // Retrieve the role from localStorage or your authentication system
    const role = localStorage.getItem('role');

    if (role !== allowedRole) {
      router.push('/beranda'); // Redirect to the home page if the role is not allowed
      return null; // Return null to prevent rendering the protected page
    }

    return <Component />;
  };
};

export default withRoleMiddleware;
