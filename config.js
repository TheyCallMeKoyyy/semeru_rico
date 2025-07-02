export const config = {
    environment: 'qa',
    credentials: {
      username: 'tbk',
      password: 'development',
    },
    journey: {
      departure: 'M.TOHA',
      arrival: 'CIBUBUR2',
      date: 'August 30, 2025',
      return_date: 'September 30, 2025',
      passenger_count: 2
    },
    otp: '123456',
    passenger_data: {
        booker: {
            // 'Enricco Zefanya',
            //test masuk ke github.
            email: '2282026@unai.edu',
            phone_number: '083116912560'
            
        },
        cust_name_same: 3,
        custName: "Enricco Zefanya",
        passengers: [
            {
                name: "Enricco Zefanya",
                gender: "laki-laki",
                seat_number: "2B",
            },
            {
                name: "Stanny Bellinda",
                gender: "Perempuan",
                seat_number: "4A",
            },
        ]
    },
    voucher:{
      freepass: '',
      harga: '',
      diskon: ''
    },
  payment: {
    collapse0: {
      collapse: 0,
    },
    collapse1: {
      collapse: 'Payment Method 1',
      gopay: 'GOPAY',
    },
    collapse2: {
      collapse: 'Payment Method 2',
      vamandiri: 'Mandiri Virtual Account',
    },
    collapse3: {
      collapse: 'Payment Method 3',
    },
  },
  change_payment: 'Mandiri Virtual Account',
  booking_code: {
    ticket: 'BDTR250306D23B',
    packet: 'PCNX250221OKA5',
  },
  url: {
    website: 'https://aragontrans.com',
    otp: ''
  }
};