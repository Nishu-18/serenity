import React, { useState, useEffect } from 'react';
import { db } from '@/database/dbconfig';
import { collection, addDoc } from 'firebase/firestore';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

function OauthForm() {
    const [isOpen, setIsOpen] = useState(false); // ⬅️ control dialog open state

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        role: '',
        googleDetails: null,
    });

    useEffect(() => {
        const googleData = JSON.parse(localStorage.getItem("googleUser"));
        if (googleData) {
            setFormData((prev) => ({
                ...prev,
                name: googleData.name || "",
                email: googleData.email || "",
                googleDetails: googleData,
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.role || !formData.name || !formData.age || !formData.email) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            const collectionRef = collection(db, formData.role === 'mentor' ? 'mentors' : 'counselors');
            await addDoc(collectionRef, {
                name: formData.name,
                age: formData.age,
                email: formData.email,
                googleDetails: formData.googleDetails,
                timestamp: new Date(),
            });
            alert(`${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} application submitted!`);
            setFormData({
                name: '',
                age: '',
                email: '',
                role: '',
                googleDetails: null,
            });
            setIsOpen(false); // ⬅️ close dialog
        } catch (error) {
            console.error("Error storing data: ", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <p className='cursor-pointer h-full px-4 border-[3px] border-green-700 rounded-full flex items-center justify-center gap-2 ml-4 font-medium hover:bg-green-700 hover:text-white transition-all duration-200'>
                    <span className='h-5 w-5 flex items-center justify-center rounded-full bg-green-700 text-white text-xl'>+</span>
                    Be a Counselor
                </p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-green-600 font-baloo">
                <DialogHeader>
                    <DialogTitle className='text-2xl text-center'>Want to become a Mentor/Counslor</DialogTitle>
                    <DialogDescription className='text-xl'>
                        Join us as a mentor or counselor to guide and support others on their journey.
                    </DialogDescription>
                </DialogHeader>
                <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
                    <h2 className="text-2xl font-bold mb-4 text-center">Become a Mentor / Counselor</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="border p-2 rounded" />
                        <input type="number" name="age" placeholder="Your Age" value={formData.age} onChange={handleChange} className="border p-2 rounded" />
                        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="border p-2 rounded" />
                        <select name="role" value={formData.role} onChange={handleChange} className="border p-2 rounded">
                            <option value="">Select Role</option>
                            <option value="mentor">Mentor</option>
                            <option value="counselor">Counselor</option>
                        </select>
                        <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-blue-700 transition">
                            Submit Application
                        </button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default OauthForm;
