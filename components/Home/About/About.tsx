'use client';

import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import { Card, CardBody } from '@nextui-org/react';

export const About = () => {
  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <DocumentPlusIcon className="w-7 h-7 text-primary" />
        About Us
      </h2>

      <Card shadow="sm" className="border border-default-200">
        <CardBody className="space-y-4 text-default-700 text-base">
          <p>
            Welcome to{' '}
            <span className="font-semibold text-primary">[Your App Name]</span>!
            We are passionate about providing powerful and easy-to-use tools for
            developers, designers, and creators around the world.
          </p>
          <p>
            Our mission is to simplify your workflow by offering well-crafted,
            customizable UI components and resources that boost productivity and
            creativity.
          </p>
          <p>
            Built with modern technologies like{' '}
            <span className="font-semibold">Next.js</span>,
            <span className="font-semibold">HeroUI</span>, and{' '}
            <span className="font-semibold">Tailwind CSS</span>, we strive for
            performance, accessibility, and delightful user experience.
          </p>
          <p>Thank you for being part of our journey. 🚀</p>
        </CardBody>
      </Card>
    </section>
  );
};
