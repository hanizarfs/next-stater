"use client"

import React from 'react';
import Layout from '@/components/layout';
import withRoleMiddleware from '@/middleware/withRoleMiddleware';

const Classroom: React.FC = () => {
  return (
    <Layout>
      <h1>Classroom</h1>
      {/* Add the content for this page here */}
    </Layout>
  );
};

export default withRoleMiddleware('admin', Classroom);
