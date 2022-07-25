import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from '../navBar/NavBar';
import { useNavigate } from "react-router-dom";
import {
  clearBudget,
  getUserBudget,
} from "../../redux/actions/index";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const budgets = useSelector((state) => state.budgets);
  const rest = budgets.moneyIn - budgets.moneyOut;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (Array.isArray(budgets.rows)) {
      localStorage.setItem("id", budgets.id);
    } else {
      let id = localStorage.getItem("id");
      dispatch(getUserBudget(id, token));
    }
  }, [budgets, token]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(clearBudget());
    localStorage.removeItem("id");
    navigate("../create");
  }
  return (
    <div>
        <NavBar />
        <h1 className="text-5xl font-bold text-gray-900 mt-30" >{budgets.name}</h1>
        <div className="antialiased bg-gray-200 font-ssans flex h-screen">
            <div className="mx-auto m-8 space-y-6">

                <div className="pl-1 max-w-5xl w-screen h-48 bg-blue-300 rounded-lg shadow-md">
                    <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                        <div className="my-auto text-xl">
                            <p className="font-bold text-xl">INGRESOS TOTALES (AL MES)</p>
                            ${budgets.moneyIn ? budgets.moneyIn : 0}
                        {Array.isArray(budgets.rows) &&
                          budgets.rows.map((elm) => {
                            if (elm.selectType === false) {
                              return (
                            <p className="text-xl"> {elm.name}: + ${elm.amount}</p>
                            );
                        }
                      })}
                        </div>
                        <div className="my-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>                   
                        </div>
                    </div>
                </div>

                <div className="pl-1  h-48 bg-blue-600 rounded-lg shadow-md max-w-5xl w-screen">
                    <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between ">
                        <div className="my-auto text-xl">
                            <p className="font-bold text-xl">GASTOS RECURRENTES (AL MES)</p>
                            ${budgets.moneyOut ? budgets.moneyOut : 0}
                        {Array.isArray(budgets.rows) &&
                          budgets.rows.map((elm) => {
                            if (elm.selectType === true) {
                              return (
                            <p className="text-xl">{elm.name}: - ${elm.amount}</p>
                            );
                            }
                          })}
                        </div>
                        <div className="my-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>               
                        </div>
                    </div>
                </div>

                <div className="pl-1 max-w-5xl w-screen h-48 bg-red-700 rounded-lg shadow-md">
                    <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                        <div className="my-auto text-xl">
                            <p className="font-bold">RESTO (AL MES)</p>
                                <p className="text-xl">${rest ? rest : 0}</p>
                                <p className="text-xl">Esto nos queda para otros gastos y ahorro</p>
                </div>
                <div className="my-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                </div>
            </div>
        </div>

   
 
  </div>
</div>
    </div>
  )
}

export default Dashboard;