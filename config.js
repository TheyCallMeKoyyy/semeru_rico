export const config = {
    environment: 'qa',
    credentials: {
      username: 'tbk',
      password: 'development',
    },
    journey: {
      departure: 'Dipatiukur',
      arrival: 'Markas cafe',
      date: 'July 28, 2025',
      return_date: 'July 28 2025',
      passenger_count: 1,
    },
    otp: '123456',
    passenger_data: {
      name: 'shugi',
      phone_number: '089646771518',
      email: 'sutra.prabowo@gmail.com',
      address: 'jl. purbasari 4 no. 1',
      seat_number: 6,
      cust_name_same: 1,
      cust_name: 'shugi'
    },
    voucher:{
      freepass: '',
      harga: '',
      diskon: ''
    },
    payment: {
      collapse0:{
        collapse:0,
      },
      collapse1:{
        collapse:1,
        gopay: 'gopay',
        ovo:'ovo'
      },
      collapse2:{
        collapse:2,
        vamandiri: 'wmandiriva',
      },
      collapse3:{
        collapse:3

      },     
    },
    change_payment:'wmandiriva',
    booking_code: {
      ticket: 'BDTR250306D23B',
      packet: 'PCNX250221OKA5',
    },
    url:{
      website: 'https://daytrans.co.id',
      otp: ''
    }
};