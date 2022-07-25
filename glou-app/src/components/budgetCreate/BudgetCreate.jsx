import React from "react";



const BudgetCreate = ({name, value, onChange, type, label}) => {
    if (type === "selectCategory")
  return (
    <div >
        {/* <label name={name} className="text-gray-900 font-light mt-4 text-xl">Categoria<span className="text-red-500">*</span></label> */}
            <select value={value} onChange={onChange}
            className="w-24 hover:bg-gray-100 bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500" 
                    type="text" 
                    name={name}
                    label={label} >
                    <option  value={"Principal"}>Principal</option>
                    <option  value={"Secundario"}>Secundario</option>
                    <option  value={"Hogar"}>Hogar</option>
                    <option  value={"Salud"}>Salud</option>
                    <option  value={"Vacaciones"}>Vacaciones</option>
                    </select>
    </div>
);
    if (type === "selectSubCategory")
        return (
            <div >
                {/* <label name={name} className="text-gray-900 font-light text-xl">Subcategoria<span className="text-red-500">*</span></label> */}
                <select value={value} onChange={onChange}
                    className="w-full hover:bg-gray-100 bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500" 
                    type="text" 
                    name={name}
                    label={label} >
                        <option  value={"Ocio"}>Ocio</option>
                        <option  value={"Extras"}>Extras</option>
                        <option  value={"Supermercado"}>Supermercado</option>
                        <option  value={"Transporte"}>Transporte</option>
                        
                </select>
            </div>
        );
    if (type === "selectType")
        return (
            <div >
                {/* <label name={name} className="text-gray-900 font-light mt-4 text-xl">Tipo<span className="text-red-500">*</span></label> */}
                <select value={value} onChange={onChange}
                    className="w-full bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500" 
                    type="text" 
                    name={name}
                    label={label} >
                    <option  value={"Ingreso"}>Ingreso</option>
                    <option  value={"Egreso"}>Egreso</option>
                </select>
            </div>
        );
    if (type === "selectOther")
    return (
        <div >
        {/* <label name={name} className="text-gray-900 font-light text-xl">Subcategoria<span className="text-red-500">*</span></label> */}
        <input value={value} onChange={onChange}
            className="w-full hover:bg-gray-100  bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500" 
            type="text" 
            name={name}
            label={label} >
        </input>
    </div>
    );
}

export default BudgetCreate