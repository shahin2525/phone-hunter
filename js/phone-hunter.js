const loadPhoneHunter = async (phone = 13, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phone}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("card-container");
  phoneContainer.textContent = "";
  // console.log(phones.length);
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    // const showAllButton = document.getElementById("show-all-btn");
    showAllContainer.classList.add("hidden");
  }
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList = `card max-w-[340px] bg-gray-100 shadow-xl my-4`;

    phoneDiv.innerHTML = `
     <figure class="px-10 pt-10">
          <img
            src=${phone.image}
            alt="Shoes"
            class="rounded-xl"
          />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
   `;
    phoneContainer.appendChild(phoneDiv);
  });
  showLoadingSpine(false);
};
// show details
const handleShowDetail = async (id) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  showDetailsModal(data.data);
};

const showDetailsModal = (phone) => {
  // console.log(phone);
  console.log(phone);
  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = phone.name;

  const detailContainer = document.getElementById("details-container");
  detailContainer.innerHTML = `
  <img src=${phone.image} alt="Shoes" class="rounded-xl"/>
  <P>storage: ${phone.mainFeatures.storage}</P>
  <P>displaySize: ${phone.mainFeatures.displaySize}</P>
  <P>chipSet: ${phone.mainFeatures.chipSet}</P>
  <P>memory: ${phone.mainFeatures.memory}</P>
  <P>slug: ${phone.slug}</P>
  <P>releaseDate: ${phone.releaseDate}</P>
  <P>GPS: ${phone.others?.GPS ? phone.others.GPS : "no gps"}</P>
  `;

  show_details.showModal();
};
// const showDetailsModal = () => {};
// search text
const searchPhone1 = (isShowAll) => {
  showLoadingSpine(true);
  const phoneInput = document.getElementById("search-phone-1");
  const phone = phoneInput.value;
  loadPhoneHunter(phone, isShowAll);
  // phoneInput.value = "";
};

// loading-spine

const showLoadingSpine = (isLading) => {
  const loading = document.getElementById("loading-spinner");
  if (isLading) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};
// show all data
const showAll = () => {
  searchPhone1(true);
};

loadPhoneHunter();
