import dynamic from 'next/dynamic';
import Head from 'next/head';
import { PrivateRoute } from '../reactPages/utils/privaterouter';

const Upload = dynamic(() => import('@/reactPages/Upload'));

const UploadPage = () => {
  return (
    <>
      <PrivateRoute>
        <Upload />
      </PrivateRoute>
    </>
  );
};

export default UploadPage;
