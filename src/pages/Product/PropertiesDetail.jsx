import {Footer} from "../../components/Footer/Footer";
import React, { useEffect, useState, useParams } from 'react'
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import { useLocation } from 'react-router-dom';

const PropertiesDetail = () => {
    const [propertyForms, setPropertyForms] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [properties, setProperties] = useState([]);
    const location = useLocation();
    const paths = location.pathname;

    
    // Fetch API data when component mounts
    useEffect(() => {
        fetch('https://localhost:44362/api/PropertyFormsControllers/GetAllPropertyForms')
        .then(response => response.json())
        .then(data => {
            const filteredForms = data.filter(form => form.form_id === 1 || form.form_id === 2 || form.form_id === 3);
            setPropertyForms(filteredForms);
        })
        .catch(error => console.error('Error fetching property forms:', error));

         // Fetch properties for sale
        fetch('https://localhost:44362/api/PropertiesControllers/GetAllProperties')
        .then(response => response.json())
        .then(data => setProperties(data))
        .catch(error => console.error('Error fetching properties:', error));

        fetch('https://localhost:44362/api/PropertyTypesControllers/GetAllPropertyTypes')
        .then(response => response.json())
        .then(data => setPropertyTypes(data))
        .catch(error => console.error('Error fetching property types:', error));
        }, []);

    const getPropertyTypeName = (typeId) => {
        const type = propertyTypes.find(t => t.type_id === typeId);
        return type ? type.type_name : 'Unknown Type';
        };

    const typeToPathMap = {
        'Biệt thự': 'villasale',
        'Căn hộ': 'apartmentsale',
        'Khách sạn': 'hotelsale',
        // Thêm các loại khác nếu cần
        };  

    // const { id } = useParams(); // Lấy id từ URL
    // const [property, setProperty] = useState(null);
  
    // useEffect(() => {
    //     // Sử dụng template literals (backtick) để nối chuỗi chính xác
    //     fetch(`https://localhost:44362/api/PropertyFormsControllers/GetAllPropertyForms/${id}`)
    //       .then((response) => response.json())
    //       .then((data) => setProperty(data))
    //       .catch((error) => console.error("Error fetching property details:", error));
    //   }, [id]);
      
  
    // if (!property) {
    //   return <div>Loading...</div>; // Hiển thị khi dữ liệu đang được tải
    // }

    
  return (
    <>
        <div className="site-mobile-menu site-navbar-target">
                <div className="site-mobile-menu-header">
                <div className="site-mobile-menu-close">
                    <span className="icofont-close js-menu-toggle" />
                </div>
                </div>
                <div className="site-mobile-menu-body" />
        </div>
        <nav className="site-nav">
            <div className="container">
            <div className="menu-bg-wrap">
                <div className="site-navigation">
                <Link to="/home" className="logo m-0 float-start">BĐS THÚY HIỀN</Link>
                <ul className="js-clone-nav d-none d-lg-inline-block text-start site-menu float-end">     
                    <li className="active"><Link to="/home"  className={paths === '/home' ? 'bds_page' : paths.startsWith('/propertiesdetail/') ? 'home_page' : ''}>TRANG CHỦ</Link></li>
                    <li><Link to="/aboutus">GIỚI THIỆU</Link></li>
                    <li><a href="news.html">TIN TỨC</a></li>
                    <li className="has-children ">
                        <Link to='/properties' className={paths.startsWith('/properties') ? 'bds_page' : paths.startsWith('/propertiesdetail/') ? 'home_page' : ''}>BĐS</Link>
                        <ul className="dropdown">
                            {/* Map over the propertyForms state to display data */}
                            {propertyForms.map((form, index) => (
                            <li  className="has-children"  key={index}>
                                <Link to={form.form === 'BĐS Bán' ? '/propertiessale' : '/propertieslease'}>
                                    {form.form.toUpperCase()}
                                </Link>
                                <ul className="dropdown">
                                {propertyTypes
                                .filter(type => type.form_id === form.form_id) // Lọc theo form_id để chỉ hiển thị types tương ứng
                                .map((type, index) => {
                                    // Sử dụng ánh xạ để lấy đường dẫn từ tên loại property
                                    const link = `/${typeToPathMap[type.type_name] || 'propertiessale'}`; // Mặc định nếu không khớp
                                    return (
                                    <li key={index}>
                                        <Link to={link}>
                                        {type.type_name.toUpperCase()}
                                        </Link>
                                    </li>
                                    );
                                })}
                                </ul>
                            </li>
                            ))}
                        </ul>
                    </li>
                    <li><a href="services.html">DỊCH VỤ</a></li>
                    <li><a href="contact.html">LIÊN HỆ</a></li>
                </ul>
                <a href="#" className="burger light me-auto float-end mt-1 site-menu-toggle js-menu-toggle d-inline-block d-lg-none" data-toggle="collapse" data-target="#main-navbar">
                    <span />
                </a>
                </div>
            </div>
            </div>
        </nav>
        <div>
            <div className="hero page-inner overlay" style={{backgroundImage: 'url("/images/hero_bg_3.jpg")'}}>
                <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-9 text-center mt-5">
                    <h1 className="heading" data-aos="fade-up"> 5232 California AVE. 21BC </h1>
                    <nav aria-label="breadcrumb" data-aos="fade-up" data-aos-delay={200}>
                        <ol className="breadcrumb text-center justify-content-center">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item">
                            <a href="properties.html">Properties</a>
                        </li>
                        <li className="breadcrumb-item active text-white-50" aria-current="page">
                            5232 California AVE. 21BC
                        </li>
                        </ol>
                    </nav>
                    </div>
                </div>
                </div>
            </div>
            <div className="section">
                <div className="container">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                    <div className="img-property-slide-wrap">
                        <div className="img-property-slide">
                        <img src="/images/img_1.jpg" alt="Image" className="img-fluid" />
                        <img src="/images/img_2.jpg" alt="Image" className="img-fluid" />
                        <img src="/images/img_3.jpg" alt="Image" className="img-fluid" />
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4">
                    <h2 className="heading text-primary">5232 California Ave. 21BC</h2>
                    <p className="meta">California, United States</p>
                    <p className="text-black-50">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione
                        laborum quo quos omnis sed magnam id, ducimus saepe, debitis error
                        earum, iste dicta odio est sint dolorem magni animi tenetur.
                    </p>
                    <p className="text-black-50">
                        Perferendis eligendi reprehenderit, assumenda molestias nisi eius
                        iste reiciendis porro tenetur in, repudiandae amet libero.
                        Doloremque, reprehenderit cupiditate error laudantium qui, esse
                        quam debitis, eum cumque perferendis, illum harum expedita.
                    </p>
                    <div className="d-block agent-box p-5">
                        <div className="img mb-4">
                        <img src="images/person_2-min.jpg" alt="Image" className="img-fluid" />
                        </div>
                        <div className="text">
                        <h3 className="mb-0">Alicia Huston</h3>
                        <div className="meta mb-3">Real Estate</div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Ratione laborum quo quos omnis sed magnam id ducimus saepe
                        </p>
                        <ul className="list-unstyled social dark-hover d-flex">
                            <li className="me-1">
                            <a href="#"><span className="icon-instagram" /></a>
                            </li>
                            <li className="me-1">
                            <a href="#"><span className="icon-twitter" /></a>
                            </li>
                            <li className="me-1">
                            <a href="#"><span className="icon-facebook" /></a>
                            </li>
                            <li className="me-1">
                            <a href="#"><span className="icon-linkedin" /></a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default PropertiesDetail