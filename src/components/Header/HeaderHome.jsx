import React, { useEffect, useState } from 'react';
import 'tiny-slider/dist/tiny-slider.css';
import { tns } from 'tiny-slider/src/tiny-slider';
import '../../css/aos.css';
import '../../css/style.css';
import '../../fonts/icomoon/style.css';
import '../../fonts/flaticon/font/flaticon.css';
import heroBg3 from '../../images/mau-nha-dep-1.webp';
import heroBg1 from '../../images/hero_bg_2.jpg';
import heroBg2 from '../../images/mau-nha-dep-mai-lech-1.png';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HeaderHome() {
  const [propertyForms, setPropertyForms] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

  // Tạo ánh xạ giữa tên tiếng Việt và đường dẫn
  const typeToPathMap = {
    'Biệt thự': 'villasale',
    'Căn hộ': 'apartmentsale',
    'Khách sạn': 'hotelsale',
    // Thêm các loại khác nếu cần
  };

  // Fetch API data when component mounts
  useEffect(() => {
    AOS.init({ duration: 1000 });

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

    // Initialize the slider
    const slider = tns({
      container: '.hero-slide',
      items: 1,
      slideBy: 1,
      autoplay: true,
      controls: false,
    });
  }, []);
  
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Untree.co" />
        <link rel="shortcut icon" href="favicon.png" />
        <meta name="description" content="" />
        <meta name="keywords" content="bootstrap, bootstrap5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <title>BĐS THÚY HIỀN</title>
      </Helmet>

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
                <li className="active"><Link to="/home">TRANG CHỦ</Link></li>
                <li><Link to="/aboutus">GIỚI THIỆU</Link></li>
                <li><a href="news.html">TIN TỨC</a></li>
                <li className="has-children ">
                  <Link to='/properties'>BĐS</Link>
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

      <div className="hero">
        <div className="hero-slide">
          <div className="img overlay" style={{ backgroundImage: `url(${heroBg1})`}} />
          <div className="img overlay" style={{ backgroundImage: `url(${heroBg2})` }} />
          <div className="img overlay" style={{ backgroundImage: `url(${heroBg3})` }} />
        </div>
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-9 text-center">
              <h1 className="heading" data-aos="fade-up">
                VÙNG ĐẤT VÀ NGÔI NHÀ MƠ ƯỚC CỦA BẠN
              </h1>
              <form action="#" className="narrow-w form-search d-flex align-items-stretch mb-6" data-aos="fade-up" data-aos-delay={200}>
                <input type="text" className="form-control px-4" placeholder="Your ZIP code or City. e.g. New York" />
                <button type="submit" className="btn btn-primary">Tìm kiếm</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
