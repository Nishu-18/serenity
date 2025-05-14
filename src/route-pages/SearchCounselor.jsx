import React from 'react'
import { db } from '@/database/dbconfig'
import { counselor_list } from '@/constants/Constants';

function SearchCounselor() {

    const counselor_Info = async () => {
        const docRef = doc(db, 'counselor_info', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log(docSnap.data());
            setTrip(docSnap.data());
        }
        else {
            alert("No such data found! Please try again");
        }
    }

    return (
        <div className='w-full py-20 px-16'>
            {counselor_list.map((item, idx) => {
                return (
                    <div key={idx} className='w-fit py-6 px-12 bg-neutral-300 border border-neutral-900 rounded-2xl font-baloo' >
                        <p className='text-3xl font-bold'>{item.name}</p>
                        <p className='text-lg'>{item.email}</p>
                        <p>{item.role}</p>
                        <button onClick={() => handlebooking()} className='cursor-pointer py-1 mt-2 px-3 rounded-lg border border-neutral-900 bg-gray-500'>book</button>
                    </div>
                )
            })}
        </div>
    )
}

export default SearchCounselor