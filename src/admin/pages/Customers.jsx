import { useAuthStore } from "@/auth/store/auth.store";
import { useEffect } from "react";
import { useUsersGeneralInfo } from "../hooks/admin.hooks";


const Customers = () => {

const {data: users_general_info = []} = useUsersGeneralInfo()


    return (
      <div className="categories-container">
            <h1 className='text-white text-xl' >Customers</h1>
            <div className="categories-grid">
                {users_general_info.map((user) => (
                    <div key={user.user_id} className="category-card">
                        <h2 className="text-black font-semibold">{user.user_name}</h2>
                         <p className="text-gray-700">
                            Publicados: <strong>{user.total_products_published}</strong>
                        </p>
                        <p className="text-gray-700">
                            Vendidos: <strong>{user.total_sold}</strong>
                        </p>
                         <p className="text-gray-700">
                            Comprados: <strong>{user.total_purchased}</strong>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Customers;