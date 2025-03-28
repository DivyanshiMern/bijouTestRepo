import { useState } from "react";

const FilterComponent = () => {
  const [openFilter, setOpenFilter] = useState(null);
  const [openSort, setOpenSort] = useState(false);

  const toggleFilter = (filter) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  return (
    // <div className="filter-wrap">
    //   <div className="left">
    //     <p>Filter By:</p>
    //   </div>
    //   <div className="middle">
    //     <ul>
    //       {[
    //         { label: "Collections", items: ["Gold", "Silver", "Diamond"], className: "collections" },
    //         { label: "Size", items: ["5", "6", "7"], className: "size" },
    //         { label: "Price", items: ["574538", "6787283", "764738"], className: "price" },
    //         { label: "Gemstones", items: ["Diamond", "Ruby", "Emerald"], className: "gemstones" },
    //       ].map(({ label, items, className }) => (
    //         <li key={label} className={className}>
    //           <a href="#" onClick={() => toggleFilter(label)}>
    //             {label}
    //           </a>
    //           {openFilter === label && (
    //             <div className="content">
    //               <ul>
    //                 {items.map((item) => (
    //                   <li key={item}>
    //                     <a href="#" className="product-name">
    //                       {item}
    //                     </a>
    //                   </li>
    //                 ))}
    //               </ul>
    //             </div>
    //           )}
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    //   <div className="right">
    //     <div className="short-by">
    //       <p>Sort By:</p>
    //       <a href="#" onClick={() => setOpenSort(!openSort)}>
    //         Recommendations
    //       </a>
    //     </div>
    //     {openSort && (
    //       <ul className="content">
    //         {["Recommendations", "Price: High to Low", "Price: Low to High"].map((sortOption) => (
    //           <li key={sortOption}>
    //             <a href="#">{sortOption}</a>
    //           </li>
    //         ))}
    //       </ul>
    //     )}
    //   </div>
    // </div>
    <div class="filter desktop">
    <div class="filter-wrap">
        <div class="left">
            <p>Filter By:</p>
        </div>
        <div class="middle">
            <ul>
                <li><a href="#" class="filter-qus" data-toggle="#collections">Collections</a></li>
                <li><a href="#" class="filter-qus" data-toggle="#metal">Metal</a></li>
                <li><a href="#" class="filter-qus" data-toggle="#purity">Purity</a></li>
                <li><a href="#" class="filter-qus" data-toggle="#prize">Price</a></li>
                <li><a href="#" class="filter-qus" data-toggle="#size">Size</a></li>
            </ul>
        </div>
    </div>
    <div class="content">
        <div class="content-wrap">
            <div class="filter-content" id="collections">
                <ul>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>Collection 01</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>Collection 02</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>Collection 03</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>Collection 04</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>Collection 05</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>Collection 06</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="filter-content" id="metal">
                <ul>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>Gold</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>Silver</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>Diamond</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="filter-content" id="purity">
                <ul>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>99%</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>98%</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>97%</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="filter-content" id="prize">
                <ul>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>₹ 5,000 & Under</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>₹ 5,000 - ₹ 10,000</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>₹ 10,000 - ₹ 15,000</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>₹ 15,000 - ₹ 20,000</span>
                        </a>
                    </li>
                    <li>
                        <a href="#"> <input id="input-checkbox" class="input-checkbox"
                                type="checkbox"/>
                            <span>₹ 20,000 - ₹ 25,000</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>₹ 25,000 - ₹ 30,000</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>₹ 30,000 & Above</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="filter-content" id="size">
                <ul>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>1.8</span>
                        </a>
                    </li>
                    <li>
                        <a href="#"><input id="input-checkbox" class="input-checkbox"
                                type="checkbox"/>
                            <span>2.5</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>1.9</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>2.6</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>2.0</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>2.7</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>2.1</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>2.8</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>2.2</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>2.9</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>2.3</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>2.10</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>2.4</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <input id="input-checkbox" class="input-checkbox" type="checkbox"/>
                            <span>2.11</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
  );
};

export default FilterComponent;
