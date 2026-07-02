import loggedInUser from '~/utils/loggedInUser';
import { test_data } from '~/utils/test/data';
export default defineEventHandler(async (event) => {
  // const config = useRuntimeConfig()
  const user = await loggedInUser(event);

  try {
    const response = test_data
    // 1. Fetch active sale listings in a specific city/state or zip code
    // const response: any = await $fetch('https://api.rentcast.io/v1/listings/sale', {
    //   method: 'GET',
    //   headers: {
    //     'X-Api-Key': process.env.RENTCAST_API_KEY || '',
    //     'Accept': 'application/json'
    //   },
    //   query: {
    //     city: 'Kalispell',
    //     state: 'MT',
    //     // status: 'Active',
    //     limit: 100 // Grab a larger batch to find local matches
    //   }
    // });

    const homes = response.filter((item: any) => {
      const company_test = "IDEAL Real Estate"
      console.log(item)
      console.log(item.listingOffice.name.toLowerCase().includes(user?.company.toLowerCase()));
      return item.listingOffice.name.toLowerCase().includes(company_test.toLowerCase());
    });

    console.log(homes)

    return { success: true, homes_company: homes }

  } catch (error: any) {
    console.error('❌ RentCast fetch failure:', error)
    return { success: false, error: error.message }
  }
})