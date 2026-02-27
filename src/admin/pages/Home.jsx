import { useProductStore } from '@/items/store/products.store';
import React, { useEffect } from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import {
  BarChart, Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
}
  from 'recharts';
import { useAdminHomeData, useDashboardStats, useProductsByCategory } from '../hooks/admin.hooks';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()
  const { data: adminData = [], isLoading: isLoadingAdminData } = useAdminHomeData()
  const { data: dashboardData = [], isLoading: isLoadingDashboardData } = useDashboardStats()
  const { data: products_by_category = [], isLoading: isLoadingProductsByCategory } = useProductsByCategory()


  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f"];

  const formattedData = products_by_category.map(item => ({
    ...item,
    total_products: Number(item.total_products)
  }));


  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>

        <div
          onClick={() => navigate('/admin/products')}
          className='card hover:cursor-pointer'>
          <div className='card-inner'>
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{adminData.total_products}</h1>
        </div>

        <div
          onClick={() => navigate('/admin/categories')}
          className='card hover:cursor-pointer'>
          <div className='card-inner'>
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{adminData.total_categories}</h1>
        </div>

        <div
          onClick={() => navigate('/admin/customers')}
          className='card hover:cursor-pointer'>
          <div className='card-inner'>
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{adminData.total_users}</h1>
        </div>

        <div 
          onClick={() => navigate('/admin/reports')}
                className='card hover:cursor-pointer'>
          <div className='card-inner'>
            <h3>REPORTS</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1>{adminData.total_reports}</h1>
        </div>

      </div>

      <div className='charts' style={{ height: 700 }}>
        <ResponsiveContainer style={{ height: 350 }}>
          <h3 className='text-white font-semibold'>Categorías populares</h3>


          <BarChart
            width={500}
            height={300}
            data={formattedData}
            margin={{
              top: 8,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="category" />
            <YAxis dataKey="total_products" />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_products" fill="#13752c" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer style={{ height: 350 }}>

          <h3 className='text-white font-semibold'>Total ventas</h3>

          <LineChart
            width={500}
            height={300}
            data={dashboardData.sales_by_month}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_sales" stroke="#eba132" />
          </LineChart>
        </ResponsiveContainer>


        <ResponsiveContainer style={{ height: 700 }}>
          <h3 className='text-white font-semibold'>Más vendidos</h3>

          <PieChart
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <Pie
              data={dashboardData.best_products}
              dataKey="total_sold"
              nameKey="title"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {formattedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>


      </div>
    </main>
  )
}

export default Home