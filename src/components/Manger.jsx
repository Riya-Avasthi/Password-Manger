import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manger = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPassword = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }

    

    useEffect(() => {
        getPassword()

    }, [])

    const showPassword = (params) => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.svg")) {
            ref.current.src = "icons/eye.svg"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.svg"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = async () => {
        if (form.site.length > 2 && form.password.length > 2 && form.username.length > 2) {
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id: form.id}) })
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ ...form, id: uuidv4() })})
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])
            setForm({ site: "", username: "", password: "" })
            toast('Password saved succesfully !!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast('Error: Failed to save Password !!')
        }
    }

    const deletePassword = async  (id) => {
        let conf = confirm("Do you really want to delete this password ?")
        console.log("deleting password with id", id)
        if (conf) {
            setPasswordArray(passwordArray.filter(item => item.id != id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != id)))
            await fetch("http://localhost:3000/", { method: "DELETE", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ id})})
            toast('Password deleted successfully !!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        setForm({...passwordArray.filter(i => i.id === id)[0], id: id})
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }


    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }




    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-fuchsia-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
            <div className=" p-2 max-w-4xl md:mycontainer min-h-[85vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-fuchsia-500">&lt;</span>
                    <span>Pass</span>
                    <span className="text-fuchsia-500">Man/&gt;</span>
                </h1>
                <p className='text-fuchsia-700 text-center text-lg'>Your Password Manager</p>
                <div className=" flex flex-col p-4 text-black gap-5 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-xl border border-fuchsia-500 w-full p-4 py-1' type="text" name='site' id='site' />
                    <div className="flex md:flex-row flex-col w-full gap-6 justify-between">
                        <input value={form.username} onChange={handleChange} placeholder='Enter UserName' className='rounded-xl border border-fuchsia-500 w-full p-4 py-1' type="text" name='username' id='username' />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-xl border border-fuchsia-500 w-60 p-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-[2px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={30} src="/icons/eye.svg" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-fuchsia-200 hover:bg-fuchsia-300 rounded-full px-2 py-2 w-fit gap-4 border border-fuchsia-900'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover">
                        </lord-icon>
                        Save Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-xl overflow-hidden">
                        <thead className='bg-fuchsia-700 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>UserName</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-fuchsia-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center w-52'><a href={item.site} target='_blank' >{item.site}</a>
                                        <div className='flex items-center justify-center'>
                                            <div className='lordiconcopy cursor-pointer size-7 ' onClick={() => { copyText(item.site) }}>                                     <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy cursor-pointer size-7' onClick={() => { copyText(item.username) }}>
                                                <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy cursor-pointer size-7' onClick={() => { copyText(item.password) }}>
                                                <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <span onClick={() => { editPassword(item.id) }} className='cursor-pointer mx-2'><lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover"></lord-icon></span>
                                        <span onClick={() => { deletePassword(item.id) }} className='cursor-pointer mx-2'><lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} src="https://cdn.lordicon.com/skkahier.json" trigger="hover"></lord-icon></span>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manger
