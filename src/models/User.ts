

class User {
    id: number;
    uid: string;
    password: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    avatar: string;
    gender: string;
    phone_number: string;
    social_insurance_number: string;
    date_of_birth: string;
    employment: {
      title: string;
      key_skill: string;
    };
    address: {
      city: string;
      street_name: string;
      street_address: string;
      zip_code: string;
      state: string;
      country: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
    credit_card: {
      cc_number: string;
    };
    subscription: {
      plan: string;
      status: string;
      payment_method: string;
      term: string;
    };

    constructor(data: any) {
      // Gán giá trị từ dữ liệu vào các thuộc tính của class
      this.id = data.id;
      this.uid = data.uid;
      this.password = data.password;
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.username = data.username;
      this.email = data.email;
      this.avatar = data.avatar;
      this.gender = data.gender;
      this.phone_number = data.phone_number;
      this.social_insurance_number = data.social_insurance_number;
      this.date_of_birth = data.date_of_birth;
      this.employment = data.employment;
      this.address = data.address;
      this.credit_card = data.credit_card;
      this.subscription = data.subscription;
    }
  }



export default User;