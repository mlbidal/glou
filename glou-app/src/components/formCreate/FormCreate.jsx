import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {  createNewBudget, clearBudget, } from "../../redux/actions/index";
import s from "./FormCreate.module.css";
import BudgetCreate from "../budgetCreate/BudgetCreate";
import NavBar from "../navBar/NavBar";

export default function FormCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertToken, setAlertToken] = useState(false);
    const token = localStorage.getItem("token");
    const user = useSelector((state) => state.user);
    const [budget , setBudget] = useState([{
        name: "",
        category: "", 
        subCategory: "",
        amount: "", 
        selectType: false
    }]);

    useEffect(() => {
        dispatch(clearBudget());
        localStorage.removeItem("id");
        if (typeof user.accessToken === "string") {
          localStorage.setItem("token", user.accessToken);
        }
        !token && setAlertToken(true);
        token && setAlertToken(false);
      }, [user, token]); 

      
    const handleSubmit = (e) => {
        e.preventDefault()
        for (let i = 0; i < budget.length; i++) {
            if (Object.values(budget[i]).includes("")) {
                return setAlert(true);
            }
        }
        let aux = { name: name, rows: budget };
        if (!token) {
        return;
        }
        dispatch(createNewBudget(aux, token));
        setName("");
        setBudget([{ name: "", category: "",subCategory: "", amount: "", selectType: false }]);
        navigate("../dashboard");
    }   

    const handleChangeName = (e) => {
        e.preventDefault()
        
        setName(e.target.value);
    }

    function handleDelete(i) {
        let previosBudget = [...budget];
        previosBudget.splice(i, 1);
        setBudget(previosBudget);
    }

    function handleChange(e, i) {
        const previousBudget = [...budget];
        previousBudget[i][e.target.name] = e.target.value;
        setBudget(previousBudget);
      }
    
      function handleClick() {
        const newBudget = { name: "", category: "", subCategory: "", amount: "", isExpense: false };
        setBudget([...budget, newBudget]);
      }

    return (
        <div>
             <NavBar />
    <div className={s.containerGral}>
    
    <h1 className="text-5xl font-bold text-gray-900 mt-30" >Crea tu presupuesto</h1>
    {alertToken && (
        <div className=" mx-auto mt-10 preview flex flex-col">
        <div className="flex justify-between py-4 px-8 bg-[#ededed]  text-[#5d5d5d]">
          <p className="text-xl">Debes iniciar sesion o registrarte para poder crear tu presupuesto!  </p>
        </div>
        <br></br>
        </div>
    )}
    <div  className="text-xl flex flex-col px-8 py-8 bg-white text-gray-700 mt-20 max-w-5xl w-screen">
        <div>
            <label className="text-gray-700  text-2xl font-light mt-8">Nombre del presupuesto<span className="text-red-500 ">*</span></label>
            <br></br>
                <input 
                className="w-96  bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500 hover:bg-gray-100"
                    type= "text"
                    value= {name}
                    name = "name"
                    id="firstName"
                    onChange={handleChangeName}
                    placeholder= 'Nombre del presupuesto'
                    />
                    </div>
                    

                    {budget.map((p, i) => (
                    <div key={i} className="flex items-center justify-center mt-10">
	<div className="container">
		<table className="max-w-5xl w-screen flex flex-row flex-no-wrap sm:bg-white rounded overflow-hidden sm:shadow-lg my-5">
			<thead className="text-white">
				<tr className="bg-gray-500 flex flex-col flex-no wrap sm:table-row rounded sm:rounded-none mb-2 sm:mb-0">
					<th className="p-3 text-left">Nombre</th>
					<th className="p-3 text-left">Importe</th>
                    <th className="p-3 text-left">Categoría</th>
                    <th className="p-3 text-left">Subcategoría</th>
                    <th className="p-3 text-left">Tipo</th>
					<th className="p-3 text-left" width="110px">Acción</th>
				</tr>
				
			</thead>
			<tbody className="flex-1 sm:flex-none">
				<tr className="flex flex-col flex-no wrap  sm:table-row mb-2 sm:mb-0">
					<td className="p-3">
                    <input value={p.name} onChange={(e) => handleChange(e, i)} placeholder= 'Nombre'
                    type="text" name="name" className="hover:bg-gray-100 w-80 bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500" /> 
                    </td>
					<td className="p-3 truncate">
                    <input value={p.amount} onChange={(e) => handleChange(e, i)} placeholder= '$'
                    type="number" step='0.01' name="amount" className="w-24 bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500 hover:bg-gray-100" /> 
                    </td>
                    <td className="p-3 truncate">
                    <BudgetCreate
                        name='category'
                        onChange={(e) => handleChange(e, i)}
                        type='selectCategory'
                        value={p.category}
                        />
                    </td>
                    <td className="p-3 truncate">
                    <BudgetCreate 
                    name='subCategory'
                    onChange={(e) => handleChange(e, i)}
                    type='selectSubCategory'
                    value={p.subCategory}
                    
                    />
                    </td>
                    <td className="p-3 truncate">
                        <BudgetCreate
                        name='type'
                        onChange={(e) => handleChange(e, i)}
                        type='selectType'
                        value={p.selectType}
                        
                        />
                    </td>
					<td className="p-3 text-red-400 hover:text-red-600 font-bold hover:font-medium cursor-pointer">
                    <button onClick={handleDelete}>ELIMINAR</button>
                    </td>
				</tr>
       

			</tbody>
		</table>
	</div>
</div>

))}            
                    </div>
                    <div className="flex flex-row items-center justify-start">
                        <button onClick={handleSubmit}
                        className="px-10 mt-8 py-2 bg-blue-500 text-gray-50 font-light rounded-md text-lg flex flex-row items-center">Crear</button>
                    </div>
                    <div className="flex flex-row items-center justify-start">
                        <button onClick={handleClick}
                        className="px-4 mt-8 py-2 bg-gray-500 text-gray-50 font-light rounded-md text-lg flex flex-row items-center">+</button>
                    </div>
                    
    </div>
    </div>
  );
};


// {budget.map((p, i) => (
//     <div key={i} className="rounded-lg shadow-xl flex flex-col px-8 py-8 bg-white  mt-10 max-w-5xl w-screen">
//     <div >
//     <label name="name" className="text-gray-900 font-light mt-8 text-xl ">Nombre<span className="text-red-500 ">*</span></label>
//     <input value={p.name} onChange={(e) => handleChange(e, i)}
//     type="text" name="name" className="w-full bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500" /> 
//     </div>
//     <div>
//     <label name="amount" className="text-gray-900 font-light mt-8 text-xl ">Importe<span className="text-red-500 ">*</span></label>
//     <input value={p.amount} onChange={(e) => handleChange(e, i)}
//     type="number" step='0.01' name="amount" className="w-full bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500" /> 
//     </div>

//     <BudgetCreate
//     name='category'
//     onChange={(e) => handleChange(e, i)}
//     type='selectCategory'
//     value={p.category}
//     label={'Categoría'}
//     />
    
//     <BudgetCreate 
//     name='subCategory'
//     onChange={(e) => handleChange(e, i)}
//     type='selectSubCategory'
//     value={p.subCategory}
//     label={'subCategoría'}
//     />
    
//     <BudgetCreate
//     name='type'
//     onChange={(e) => handleChange(e, i)}
//     type='selectType'
//     value={p.isExpense}
//     label={'Tipo'}
//     />
    
//     <div className="flex flex-row items-center justify-start  bg-transparent  text-red-500">
//         <button onClick={handleDelete}
//         className="font-bold flex flex-row items-center text-xl">&#10005;</button>
//         </div>

// </div>
// ))}