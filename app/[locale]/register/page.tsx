"use client";

import { AuthLayout } from "@/app/components";
import FormInput from "@/app/components/reusables/form-fields/FormInput/FormInput";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion"
import { buttonAnimationVariants, containerVariants, itemVariants } from "@/constants/animationVariants";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            router.push("/");
        } catch (err) {
            toast({
                variant: "destructive",
                description: "Registration failed. Please try again.",
            });
        }
    };

    return (
        <AuthLayout
            title="Create your account"
            footerConfig={{
                description: "Already have an account?",
                link: "/login",
                linkText: "Sign in",
            }}
        >
            <motion.form
                className="space-y-4 w-full"
                onSubmit={handleSubmit}
                initial="hidden"
                variants={containerVariants}
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <FormInput
                        name="name"
                        type="text"
                        required
                        placeholder="Please enter your fullname"
                        label="Fullname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <FormInput
                        name="email"
                        type="email"
                        required
                        label="Email address"
                        placeholder="Please enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <FormInput
                        name="password"
                        type="password"
                        required
                        label="Password"
                        placeholder="Please enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </motion.div>

                <motion.div className="flex items-start mt-2 mb-2" variants={itemVariants}>
                    <Checkbox id="terms" required className="mt-1 mr-2" />
                    <label htmlFor="terms" className="text-sm text-gray-700 select-none">
                        I have read and agree to the
                        <motion.a
                            href="https://vn.lianlianglobal.com/legal/terms"
                            className="ml-2 text-blue-700 hover:underline"
                            whileHover={{ scale: 1.02 }}
                        >
                            Terms & Conditions
                        </motion.a>{' ,'}
                        <motion.a href="#" className="ml-2 text-blue-700 hover:underline"
                                  whileHover={{ scale: 1.02 }}>Privacy Policy.
                        </motion.a>
                    </label>
                </motion.div>

                <motion.button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                    variants={buttonAnimationVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    Sign up
                </motion.button>
            </motion.form>
        </AuthLayout>
    );
}
