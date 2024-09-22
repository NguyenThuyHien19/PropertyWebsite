import Header from "../../components/Header/HeaderHome";
import { Footer } from "../../components/Footer/Footer";
import React, { useEffect, useState } from 'react';
import '../../css/aos.css';
import '../../css/style.css';
import '../../fonts/icomoon/style.css';
import '../../fonts/flaticon/font/flaticon.css';
import 'tiny-slider/dist/tiny-slider.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Link, useNavigate } from "react-router-dom";


const Home = () => {
  const [propertiesSale, setPropertiesSale] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertiesLease, setPropertiesLease] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch properties for sale
    fetch('https://localhost:44362/api/PropertiesControllers/GetAllPropertiesSale')
      .then(response => response.json())
      .then(data => setPropertiesSale(data))
      .catch(error => console.error('Error fetching properties sale:', error));

    // Fetch property types
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

  const getPropertyTypeName = (typeId) => {
    const type = propertyTypes.find(t => t.type_id === typeId);
    return type ? type.type_name : 'Unknown Type';
  };

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };
  
  return (
    <>
      <Header />
      <div className="section" style={{background: 'rgb(248 249 250)'}}> 
        <div className="container">
          <div className="row mb-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="font-weight-bold text-primary heading">
                BĐS BÁN
              </h2>
            </div>
            <div className="col-lg-6 text-lg-end">
              <p>
                <Link to="/propertiesSale" target="_blank" className="btn btn-primary text-white py-3 px-4">XEM TẤT CẢ CÁC BĐS BÁN</Link>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="property-slider-wrap">
                <div className="property-slider"  >
                {chunkArray(propertiesSale.slice(0, 6), 3).map((propertyRow, rowIndex) => (
                  <div className="row" key={rowIndex}>
                    {propertyRow.map((property, index) => (
                      <div className="col-md-4 property-item"  key={index}>
                          <a className="img" style={{ width: "500px", height: "200px" }} 
                          onClick={() => navigate(`/propertiesdetail/${property.property_id}`)} // Điều hướng dựa trên id 
                          >
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
                              <a className="btn btn-primary py-2 px-3" onClick={() => navigate(`/propertiesdetail/${property.property_id}`)}>
                                Xem chi tiết
                              </a>
                            </div>
                          </div>
                      </div>
                    ))}
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div className="container">
          <div className="row mb-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="font-weight-bold text-primary heading">
                BĐS CHO THUÊ
              </h2>
            </div>
            <div className="col-lg-6 text-lg-end">
              <p>
                <Link to="/propertiesLease" target="_blank" className="btn btn-primary text-white py-3 px-4">XEM TẤT CẢ CÁC BĐS THUÊ</Link>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="property-slider-wrap">
                <div className="property-slider"  >
                {chunkArray(propertiesLease.slice(0, 6), 3).map((propertyRow, rowIndex) => (
                  <div className="row" key={rowIndex}>
                    {propertyRow.map((property, index) => (
                      <div className="col-md-4 property-item"  key={index}>
                        
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
                ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div>
          <section className="features-1">
            <div className="container">
              <div className="row">
                <div className="col-6 col-lg-3"  data-aos="fade-up" data-aos-delay="200">
                  <div className="box-feature">
                    <span className="flaticon-house" />
                    <h3 className="mb-3">Our Properties</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptates, accusamus.
                    </p>
                    <p><a href="#" className="learn-more">Learn More</a></p>
                  </div>
                </div>
                <div className="col-6 col-lg-3"  data-aos="fade-up" data-aos-delay="400">
                  <div className="box-feature">
                    <span className="flaticon-building" />
                    <h3 className="mb-3">Property for Sale</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptates, accusamus.
                    </p>
                    <p><a href="#" className="learn-more">Learn More</a></p>
                  </div>
                </div>
                <div className="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
                  <div className="box-feature">
                    <span className="flaticon-house-3" />
                    <h3 className="mb-3">Real Estate Agent</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptates, accusamus.
                    </p>
                    <p><a href="#" className="learn-more">Learn More</a></p>
                  </div>
                </div>
                <div className="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="500">
                  <div className="box-feature">
                    <span className="flaticon-house-1" />
                    <h3 className="mb-3">House for Sale</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptates, accusamus.
                    </p>
                    <p><a href="#" className="learn-more">Learn More</a></p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <div class="section section-4 bg-light">
            <div class="container">
              <div class="row justify-content-center text-center mb-5">
                <div class="col-lg-5">
                  <h2 class="font-weight-bold heading text-primary mb-4">
                    Let's find home that's perfect for you
                  </h2>
                  <p class="text-black-50">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                    enim pariatur similique debitis vel nisi qui reprehenderit.
                  </p>
                </div>
              </div>
              <div class="row justify-content-between mb-5">
                <div class="col-lg-7 mb-5 mb-lg-0 order-lg-2">
                  <div class="img-about dots">
                    <img src="images/mau-nha-dep-30.jpg" alt="Image" class="img-fluid" style={{height: '570px', minWidth: '745px'}}/> 
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="d-flex feature-h">
                    <span class="wrap-icon me-3">
                      <span class="icon-home2"></span>
                    </span>
                    <div class="feature-text">
                      <h3 class="heading">2M Properties</h3>
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
                      <h3 class="heading">Top Rated Agents</h3>
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
                      <h3 class="heading">Legit Properties</h3>
                      <p class="text-black-50">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nostrum iste.
                      </p>
                    </div>
                  </div>
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

          <div class="section" style={{background: '#ffff', paddingBottom: '1rem'}}>
            <div class="row justify-content-center footer-cta" data-aos="fade-up">
              <div class="col-lg-7 mx-auto text-center" >
                <h2 class="mb-4">Be a part of our growing real state agents</h2>
                <p>
                  <a
                    href="#"
                    target="_blank"
                    class="btn btn-primary text-white py-3 px-4"
                    >Apply for Real Estate agent</a
                  >
                </p>
              </div>
            </div>

          </div>

          <div className="section section-5 bg-light" style={{paddingBottom: '0rem'}}>
            <div className="container">
              <div className="row justify-content-center text-center mb-5">
                <div className="col-lg-6 mb-5">
                  <h2 className="font-weight-bold heading text-primary mb-4">
                    Our Agents
                  </h2>
                  <p className="text-black-50">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                    enim pariatur similique debitis vel nisi qui reprehenderit totam?
                    Quod maiores.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0">
                  <div className="h-100 person">
                    <img src="images/person_1-min.jpg" alt="Image" className="img-fluid" />
                    <div className="person-contents">
                      <h2 className="mb-0"><a href="#">James Doe</a></h2>
                      <span className="meta d-block mb-3">Real Estate Agent</span>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facere officiis inventore cumque tenetur laboriosam, minus
                        culpa doloremque odio, neque molestias?
                      </p>
                      <ul className="social list-unstyled list-inline dark-hover">
                        <li className="list-inline-item">
                          <a href="#"><span className="icon-twitter" /></a>
                        </li>
                        <li className="list-inline-item">
                          <a href="#"><span className="icon-facebook" /></a>
                        </li>
                        <li className="list-inline-item">
                          <a href="#"><span className="icon-linkedin" /></a>
                        </li>
                        <li className="list-inline-item">
                          <a href="#"><span className="icon-instagram" /></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0">
                  <div className="h-100 person">
                    <img src="images/person_2-min.jpg" alt="Image" className="img-fluid" />
                    <div className="person-contents">
                      <h2 className="mb-0"><a href="#">Jean Smith</a></h2>
                      <span className="meta d-block mb-3">Real Estate Agent</span>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facere officiis inventore cumque tenetur laboriosam, minus
                        culpa doloremque odio, neque molestias?
                      </p>
                      <ul className="social list-unstyled list-inline dark-hover">
                        <li className="list-inline-item">
                          <a href="#"><span className="icon-twitter" /></a>
                        </li>
                        <li className="list-inline-item">
                          <a href="#"><span className="icon-facebook" /></a>
                        </li>
                        <li className="list-inline-item">
                          <a href="#"><span className="icon-linkedin" /></a>
                        </li>
                        <li className="list-inline-item">
                          <a href="#"><span className="icon-instagram" /></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0">
                  <div className="h-100 person">
                    <img src="images/person_3-min.jpg" alt="Image" className="img-fluid" />
                    <div className="person-contents">
                      <h2 className="mb-0"><a href="#">Alicia Huston</a></h2>
                      <span className="meta d-block mb-3">Real Estate Agent</span>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facere officiis inventore cumque tenetur laboriosam, minus
                        culpa doloremque odio, neque molestias?
                      </p>
                      <ul className="social list-unstyled list-inline dark-hover">
                        <li className="list-inline-item">
                          <a href="#"><span className="icon-twitter" /></a>
                        </li>
                        <li className="list-inline-item">
                          <a href="#"><span className="icon-facebook" /></a>
                        </li>
                        <li className="list-inline-item">
                          <a href="#"><span className="icon-linkedin" /></a>
                        </li>
                        <li className="list-inline-item">
                          <a href="#"><span className="icon-instagram" /></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
