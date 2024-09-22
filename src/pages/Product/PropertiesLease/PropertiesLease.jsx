import {Footer} from "../../../components/Footer/Footer";
import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const PropertiesLease = () => {
    const [propertyForms, setPropertyForms] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [propertiesLease, setPropertiesLease] = useState([]);
    const [paths, setPath] = useState('');

    // Fetch API data when component mounts
    useEffect(() => {
        fetch('https://localhost:44362/api/PropertyFormsControllers/GetAllPropertyForms')
        .then(response => response.json())
        .then(data => {
            const filteredForms = data.filter(form => form.form_id === 1 || form.form_id === 2 || form.form_id === 3);
            setPropertyForms(filteredForms);
        })
        .catch(error => console.error('Error fetching property forms:', error));

        fetch('https://localhost:44362/api/PropertyTypesControllers/GetAllPropertyTypes')
        .then(response => response.json())
        .then(data => setPropertyTypes(data))
        .catch(error => console.error('Error fetching property types:', error));

        // Fetch properties for sale
        fetch('https://localhost:44362/api/PropertiesControllers/GetAllPropertiesLease')
        .then(response => response.json())
        .then(data => setPropertiesLease(data))
        .catch(error => console.error('Error fetching properties lease:', error));
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

    useEffect(() => {
      const pathname = window.location.pathname;
      const path = pathname.split('/')[1];
      setPath(path);
  }, [])

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
                    <li className="active"><Link to="/home" className={paths === 'home' ? 'bds_page' : paths === 'propertieslease' ? 'home_page' : ''}>TRANG CHỦ</Link></li>
                    <li><Link to="/aboutus">GIỚI THIỆU</Link></li>
                    <li><a href="news.html">TIN TỨC</a></li>
                    <li className="has-children">
                    <Link to='/properties' className={paths === 'home' ? 'home_page' : paths === 'propertieslease' ? 'bds_page' : ''}>BĐS</Link>
                    <ul className="dropdown">
                        {/* Map over the propertyForms state to display data */}
                        {propertyForms.map((form, index) => (
                        <li className="has-children" key={index}>
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
        <div className="hero page-inner overlay" style={{backgroundImage: 'url("images/hero_bg_3.jpg")'}}>
            <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-9 text-center mt-5">
                <h1 className="heading" data-aos="fade-up">Bất Động Sản Cho Thuê</h1>
                <nav aria-label="breadcrumb" data-aos="fade-up" data-aos-delay="200">
                    <ol className="breadcrumb text-center justify-content-center">
                    <li className="breadcrumb-item"><Link to="/home">Trang chủ</Link></li>
                    <li className="breadcrumb-item active text-white-50" aria-current="page">
                        BĐS Cho Thuê
                    </li>
                    </ol>
                </nav>
                </div>
            </div>
            </div>
        </div>
        <div className="section section-properties" style={{paddingBottom : '0rem'}}>
            <div className="container">
                <div className="row" style={{marginBottom: '0px'}}>
                <div className="col-12">
              <div className="property-slider-wrap">
                <div className="property-slider"  >
                  <div className="row" style={{marginBottom: '0px'}}>
                    {propertiesLease.map((property, index) => (
                      <div className="col-md-4 property-item"  key={index} style={{marginBottom: '30px'}}>
                          <a href="property-single.html" className="img" style={{width: '500px', height: '200px'}}>
                            <img src={property.image_url || "/images/default-image.jpg"} alt="Image" className="img-fluid"style={{width: '415px', height: '400px', borderRadius: '4px'}} />
                          </a>
                          <div className="property-content">
                            <div className="d-flex justify-content-between">
                                <span className="price">{property.price}</span>
                                <span className="status">{property.status}</span>
                            </div>
                            <div>
                              <span className="d-block mb-2 text-black-50">{getPropertyTypeName(property.type_id)}</span>
                              <span className="city d-block mb-3">{property.address}</span>
                              <div className="specs d-flex mb-4">
                                <span className="d-block d-flex align-items-center me-3">
                                  <span className="icon-bed me-2" />
                                  <span className="caption">{property.beds} beds</span>
                                </span>
                                <span className="d-block d-flex align-items-center">
                                  <span className="icon-bath me-2" />
                                  <span className="caption">{property.baths} baths</span>
                                </span>
                              </div>
                              <a href="property-single.html" className="btn btn-primary py-2 px-3">Xem chi tiết</a>
                            </div>
                          </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
                </div>
                <div className="row align-items-center py-5">
                    <div className="col-lg-3">Pagination (1 of 10)</div>
                        <div className="col-lg-6 text-center">
                            <div className="custom-pagination">
                            <a href="#">1</a>
                            <a href="#" className="active">2</a>
                            <a href="#">3</a>
                            <a href="#">4</a>
                            <a href="#">5</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}
export default PropertiesLease;
