export const config = {
    environment: 'qa',
    credentials: {
      username: 'tbk',
      password: 'development',
    },
    journey: {
      departure: 'KOPI KENANGAN PARUNG',
      arrival: 'INDOMARET HYBRID-CIKARANG',
      date: 'July 30, 2025',
      return_date: 'July 30, 2025',
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
        cust_name_same: 2,
        custName: "Enricco Zefanya",
        passengers: [
            {
                name: "Enricco Zefanya",
                gender: "laki-laki",
                seat_number: "3",
            },
            {
                name: "Setly Boyoh",
                gender: "Perempuan",
                seat_number: "4",
            },
            {
                name: "Stanny Bellinda",
                gender: "Perempuan",
                seat_number: "5",
            }
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
    website: 'https://semerutrans.com',
    otp: ''
  }
};