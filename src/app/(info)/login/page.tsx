'use client';

import SignUp from '@/components/form/SignUp';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const Page = () => {
    const [animate, setAnimate] = useState(false);

    return (
        // <SignUp />
        <>
            <motion.div
                className="text-center"
                animate={animate && { x: -1000 }}
                transition={{ ease: "easeInOut", duration: 1 }}
            >
                <text>
                    Hello World
                </text>

            </motion.div>
            <button onClick={() => { setAnimate(true); }}>
                Press me!
            </button>
        </>

    );
};

export default Page;