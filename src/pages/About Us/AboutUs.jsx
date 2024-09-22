import {Footer} from "../../components/Footer/Footer";
import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    const [propertyForms, setPropertyForms] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [paths, setPath] = useState('');

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
        }, []);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const [startCount, setStartCount] = useState(false);
    const { ref, inView } = useInView({
        triggerOnce: true, // Chỉ kích hoạt một lần khi phần tử xuất hiện
        threshold: 0.5,    // Kích hoạt khi 50% phần tử nằm trong viewport
    });

    useEffect(() => {
    if (inView) {
        setStartCount(true);
    }
    }, [inView]);

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
                    <li className="active"><Link to="/home" className={paths === 'home' ? 'bds_page' : paths === 'aboutus' ? 'home_page' : ''}>TRANG CHỦ</Link></li>
                    <li><Link to="/aboutus" className={paths === 'home' ? 'home_page' : paths === 'aboutus' ? 'bds_page' : ''}>GIỚI THIỆU</Link></li>
                    <li><a href="news.html">TIN TỨC</a></li>
                    <li className="has-children">
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
        <div className="hero page-inner overlay" style={{backgroundImage: 'url("images/hero_bg_3.jpg")'}}>
            <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-9 text-center mt-5">
                <h1 className="heading" data-aos="fade-up">About</h1>
                <nav aria-label="breadcrumb" data-aos="fade-up" data-aos-delay="200">
                    <ol className="breadcrumb text-center justify-content-center">
                    <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                    <li className="breadcrumb-item active text-white-50" aria-current="page">
                        About
                    </li>
                    </ol>
                </nav>
                </div>
            </div>
            </div>
        </div>
        <div class="section">
            <div class="container">
                <div class="row text-left mb-5">
                <div class="col-12">
                    <h2 class="font-weight-bold heading text-primary mb-4">About Us</h2>
                </div>
                <div class="col-lg-6">
                    <p class="text-black-50">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                    enim pariatur similique debitis vel nisi qui reprehenderit totam?
                    Quod maiores.
                    </p>
                    <p class="text-black-50">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                    saepe, explicabo nihil. Est, autem error cumque ipsum repellendus
                    veniam sed blanditiis unde ullam maxime veritatis perferendis
                    cupiditate, at non esse!
                    </p>
                    <p class="text-black-50">
                    Enim, nisi labore exercitationem facere cupiditate nobis quod
                    autem veritatis quis minima expedita. Cumque odio illo iusto
                    reiciendis, labore impedit omnis, nihil aut atque, facilis
                    necessitatibus asperiores porro qui nam.
                    </p>
                </div>
                <div class="col-lg-6">
                    <p class="text-black-50">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                    saepe, explicabo nihil. Est, autem error cumque ipsum repellendus
                    veniam sed blanditiis unde ullam maxime veritatis perferendis
                    cupiditate, at non esse!
                    </p>
                    <p class="text-black-50">
                    Enim, nisi labore exercitationem facere cupiditate nobis quod
                    autem veritatis quis minima expedita. Cumque odio illo iusto
                    reiciendis, labore impedit omnis, nihil aut atque, facilis
                    necessitatibus asperiores porro qui nam.
                    </p>
                </div>
                </div>
            </div>
            
            <div class="section pt-0">
                <div class="container">
                    <div class="row justify-content-between mb-5">
                    <div class="col-lg-7 mb-5 mb-lg-0 order-lg-2">
                        <div class="img-about dots">
                        <img src="images/hero_bg_3.jpg" alt="Image" class="img-fluid" style={{height: '570px', minWidth: '745px'}}/>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="d-flex feature-h">
                        <span class="wrap-icon me-3">
                            <span class="icon-home2"></span>
                        </span>
                        <div class="feature-text">
                            <h3 class="heading">Quality properties</h3>
                            <p class="text-black-50">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Nostrum iste.
                            </p>
                        </div>
                        </div>

                        <div class="d-flex feature-h">
                        <span class="wrap-icon me-3">
                            <span class="icon-person"></span>
                        </span>
                        <div class="feature-text">
                            <h3 class="heading">Top rated agents</h3>
                            <p class="text-black-50">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Nostrum iste.
                            </p>
                        </div>
                        </div>

                        <div class="d-flex feature-h">
                        <span class="wrap-icon me-3">
                            <span class="icon-security"></span>
                        </span>
                        <div class="feature-text">
                            <h3 class="heading">Easy and safe</h3>
                            <p class="text-black-50">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Nostrum iste.
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div class="section pt-0">
                <div class="container">
                    <div class="row justify-content-between mb-5">
                    <div class="col-lg-7 mb-5 mb-lg-0">
                        <div class="img-about dots">
                        <img src="images/hero_bg_2.jpg" alt="Image" class="img-fluid" style={{height: '570px', minWidth: '745px'}}/>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="d-flex feature-h">
                        <span class="wrap-icon me-3">
                            <span class="icon-home2"></span>
                        </span>
                        <div class="feature-text">
                            <h3 class="heading">Quality properties</h3>
                            <p class="text-black-50">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Nostrum iste.
                            </p>
                        </div>
                        </div>

                        <div class="d-flex feature-h">
                        <span class="wrap-icon me-3">
                            <span class="icon-person"></span>
                        </span>
                        <div class="feature-text">
                            <h3 class="heading">Top rated agents</h3>
                            <p class="text-black-50">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Nostrum iste.
                            </p>
                        </div>
                        </div>

                        <div class="d-flex feature-h">
                        <span class="wrap-icon me-3">
                            <span class="icon-security"></span>
                        </span>
                        <div class="feature-text">
                            <h3 class="heading">Easy and safe</h3>
                            <p class="text-black-50">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Nostrum iste.
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div class="section" style={{paddingBottom: '0rem'}}>
                <div class="container">
                    <div class="row">
                    <div class="col-md-4" data-aos="fade-up" data-aos-delay="0">
                        <img src="images/img_1.jpg" alt="Image" class="img-fluid" style={{width: '415px', height: '415px'}} />
                    </div>
                    <div class="col-md-4 mt-lg-5" data-aos="fade-up" data-aos-delay="100">
                        <img src="images/img_3.jpg" alt="Image" class="img-fluid" style={{width: '415px', height: '415px'}} />
                    </div>
                    <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
                        <img src="images/img_2.jpg" alt="Image" class="img-fluid" style={{width: '415px', height: '415px'}} />
                    </div>
                    </div>
                    <div class="row section-counter mt-5">
                    <div class="col-6 col-sm-6 col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300"  ref={ref}>
                        <div class="counter-wrap mb-5 mb-lg-0">
                            <span class="number">
                            {startCount && (
                                <CountUp
                                    start={0}
                                    end={2917}
                                    className="countup text-primary"
                                />
                                )}
                            </span>
                            <span class="caption text-black-50"># of Buy Properties</span>
                        </div>
                    </div>
                    <div class="col-6 col-sm-6 col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="400">
                        <div class="counter-wrap mb-5 mb-lg-0">
                            <span class="number">
                            {startCount && (
                                <CountUp
                                    start={0}
                                    end={3918}
                                    className="countup text-primary"
                                />
                                )}
                            </span >
                            <span class="caption text-black-50"># of Sell Properties</span>
                        </div>
                    </div>
                    <div class="col-6 col-sm-6 col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="500">
                        <div class="counter-wrap mb-5 mb-lg-0">
                            <span class="number">
                            {startCount && (
                                <CountUp
                                    start={0}
                                    end={38928}
                                    className="countup text-primary"
                                />
                                )}
                            </span>
                            <span class="caption text-black-50"># of All Properties</span>
                        </div>
                    </div>
                    <div class="col-6 col-sm-6 col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="600">
                        <div class="counter-wrap mb-5 mb-lg-0">
                            <span class="number">
                            {startCount && (
                                <CountUp
                                    start={0}
                                    end={1921}
                                    className="countup text-primary"
                                />
                                )}
                                </span>
                            <span class="caption text-black-50"># of Agents</span>
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
export default AboutUs;
