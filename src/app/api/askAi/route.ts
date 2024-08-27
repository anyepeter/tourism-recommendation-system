// @ts-nocheck
// app/api/askAI/route.ts
import { getAllSites } from '@/actions/actions';
import { NextResponse } from 'next/server';



export async function POST(req: Request) {
  const { userInput } = await req.json();

  const sites = await getAllSites();
console.log(userInput)
  try {
    // Call OpenAI API to analyze the user's input
    const aiResponse = await fetch('https://gptprompt-2oqq2we3iq-uc.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "prompt": `Analyze this user query and determine if it's asking for tourist sites in specific categories in my category table I have 4 items that is the sawa, sudano-sahelian, grassfield, fang beti. then also check the user is asking for a specfic activity carried out, point of interest, type of place I have 4 items too which are forest, lake, mountain, park,
         "${userInput}". If response like object itsRelatedTourism, category, activities, pointInterest or typeOfplace they are asking for, if not then provide a general response that answer their question with the attribute name generalResponse.`,
      }),
    });

    if (!aiResponse.ok) {
      // Handle non-200 responses from the API
      const errorText = await aiResponse.text();
      return NextResponse.json({ error: `OpenAI API Error: ${errorText}` }, { status: 500 });
    }

    const aiData = await aiResponse.json();

    const parsedData = {
      result: JSON.parse(aiData.result)
    };
    
    console.log(parsedData);

    // Process AI output
    //  const extractedInfo = aiData.text.trim(); // Assume this gives us context like location or category.

    //  console.log(extractedInfo)
     let responseText = '';
     let filteredSitess = [];

     if (parsedData.result.itsRelatedTourism) {
      const { category, activity, pointInterest, typeOfPlace } = parsedData.result

      const filteredSites = sites.filter(site => {
        return (
          (category && site.category.name.toLowerCase().includes(category.toLowerCase())) ||
          (activity && site.activities.some(act => act.toLowerCase().includes(activity.toLowerCase()))) ||
          (pointInterest && site.description.some( place => place.toLowerCase().includes(pointInterest.toLowerCase()))) ||
          (typeOfPlace && site.section.name.toLowerCase().includes(typeOfPlace.toLowerCase()))
        );
      });

      if (filteredSites.length > 0) {
        filteredSitess = filteredSites;
        responseText = `Here are some recommended places: `;
      } else {
        responseText = "Sorry, we couldn't find any sites matching your query.";
      }
    } else {
      responseText = `${parsedData.result.generalResponse}`;
    }

    // if (extractedInfo.includes("tourist") || extractedInfo.includes("visit")) {
    // //   // Filter the tourism sites based on the AI-extracted information
    //   const filteredSites = tourismSites.filter(site => {
    //     return (
    //       (extractedInfo.includes(site.category.name.toLowerCase())) ||
    //       (extractedInfo.includes(site.addresses.toLowerCase()))
    //     );
    //   });

    //   if (filteredSites.length > 0) {
    //     responseText = `Here are some recommended places: ${filteredSites.map(site => site.title).join(', ')}`;
    //   } else {
    //     responseText = "Sorry, we couldn't find any sites matching your query.";
    //   }
    // } else {
    //   // If it's a general query or unrelated to tourism
    //   responseText = "I'm sorry, but I couldn't identify any specific tourism-related information in your request.";
    // }

    return NextResponse.json({ response: responseText, filteredSitess }, { status: 200 });
  } catch (error) {
    // Handle errors gracefully
    return NextResponse.json({ error: `Internal Server Error: ${error.message}` }, { status: 500 });
  }
}
