export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const brandNames = [
  "Apple",
  "Samsung",
  "OnePlus",
  "Google",
  "Xiaomi",
  "Oppo",
  "Realme",
  "Vivo",
  "Motorola",
  "Nokia",
  "Huawei",
];

export const operatingSystems = ["Android", "iOS", "Windows", "macOS", "Linux"];

export const storageCapacity = [
  "2GB",
  "4GB",
  "8GB",
  "16GB",
  "32GB",
  "64GB",
  "128GB",
  "256GB",
  "512GB",
  "1TB",
];

const weekdays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export const genders = ["Male", "Female", "Other"];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const monthOptions = monthNames.map((item) => ({
  value: item,
  label: item,
}));

export const genderOptions = genders.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const bloodGroupOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));

export const weekDaysOptions = weekdays.map((item) => ({
  value: item,
  label: item,
}));

export const brandNameOptions = brandNames.map((item) => ({
  value: item,
  label: item,
}));

export const operatingSystemOptions = operatingSystems.map((item) => ({
  value: item,
  label: item,
}));

export const storageCapacityOptions = storageCapacity.map((item) => ({
  value: item,
  label: item,
}));
