import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import logoGlou from '../../assets/images/logoGlou.png';
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/actions/index";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const LandingPage = () =>  {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error);
    const user = useSelector((state) => state.user);
    const [alert, setAlert] = useState(false);
    const [input, setInput] = useState({
    email: "",
    password: "",
  });

    useEffect(() => {
    user.id && navigate("../create");
    typeof error === "string" && setAlert(true);
  }, [user, error]);

    function handleChange(e) {
        setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.email === "" || input.password === "") return setAlert(true);
    dispatch(signIn(input));
  };


    return (
        <div>
            <NavBar />
            <div className="bg-gray-200 h-screen overflow-hidden flex items-center justify-center">
                <div className="max-w-4xl flex">
                    <img src={logoGlou} alt="" className="hidden md:block w-1/2"/>
                    <div className="md:w-1/2 bg-white py-24 px-12">
                        <form className="bg-white">
                            <div className="mb-4">
                                <label className="block mb-2 text-xl font-bold" name="username">Correo</label>
                                <input value={input.email} onChange={handleChange}
                                        type="text" id="email" className="w-full p-3 text-xl border rounded shadow focus:outline-none focus:shadow-outline" placeholder="Correo" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-xl font-bold" name="password">Contraseña</label>
                                <input value={input.password} onChange={handleChange}
                                type="password" id="password" className="w-full p-3 text-xl border rounded shadow focus:outline-none focus:shadow-outline" placeholder="***********" />
                            </div>
                            <div className="mb-4">
                                <button onSubmit={handleSubmit} className="w-full p-3 text-xl font-bold text-white bg-blue-500 rounded-full focus:outline-none" type="submit">Entrar</button>
                            </div>
                            <hr className="mb-4 border-t" />
                            <div className="text-xl text-center">
                                <a href="#">Crea una cuenta</a>
                                <a href="#" className="text-blue-500 pl-2">Olvidaste la clave?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
 )
}

export default LandingPage;