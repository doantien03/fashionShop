export function handleCategory(path) {
  let category = null;
  let type = null;

  //  nhóm ÁO
  if (path === "/ao") {
    category = "ao";
  } 
  else if (path === "/ao/phong") {
    category = "ao";
    type = "ao-phong";
  } 
  else if (path === "/ao/polo") {
    category = "ao";
    type = "ao-polo";
  } 
  else if (path === "/ao/somi") {
    category = "ao";
    type = "ao-somi";
  }

  // nhóm quần
  else if (path === "/quan") {
    category = "quan";
  } 
  else if (path === "/quan/short") {
    category = "quan";
    type = "quan-short";
  } 
  else if (path === "/quan/dai") {
    category = "quan";
    type = "quan-dai";
  }
  
  // phụ kiện
  else if (path === "/phu-kien") {
    category = "phu-kien";
  }
  else if (path === "/phu-kien/tui-balo") {
    category = "phu-kien";
    type = "tui-balo";
  }
  else if (path === "/phu-kien/giay-dep") {
    category = "phu-kien";
    type = "giay-dep";
  }
  else if (path === "/phu-kien/day-lung") {
    category = "phu-kien";
    type = "day-lung";
  }
  
  return { category, type };

  //  gọi sang trang pages js
  if (path.startsWith("/ao")) {
  window.renderShirts?.({ category, type });
  }

  if (path.startsWith("/quan")) {
  window.renderPants?.({ category, type });
  }

  if (path.startsWith("/phu-kien")) {
  window.renderAccessory?.({ category, type });
}
}