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
  console.log(phones.length);
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
    console.log(phone);
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
            <button onclick="showModal('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
   `;
    phoneContainer.appendChild(phoneDiv);
  });
  showLoadingSpine(false);
};
// show details
const showModal = async (id) => {
  const phone = await fetch(
    ` https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await phone.json();
  showDetails(data.data);
  show_details.showModal();
};

const showDetails = (data) => {
  console.log(data);
  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = data.phone_name;
};
const showDetailsModal = () => {};
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
