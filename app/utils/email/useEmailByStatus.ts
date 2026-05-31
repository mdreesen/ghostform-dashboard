    export function email_by_status(status: string, lead_name: string, company_name: string) {
    const greeting = `Hi ${lead_name},\n\n`;
    const signoff = `\n\nBest,\n\n${company_name}`;
  
    switch (status.toLowerCase()) {
      case 'new':
        return greeting + 
          `Thanks for checking out the property info details through our digital flyer.\n\n` +
          `I wanted to personally reach out and see if you had any quick questions about the home, the neighborhood, or local market trends that I can track down for you?\n\n` +
          `Just reply straight to this email whenever you have a second.` + 
          signoff;
  
      case 'appointment':
        return greeting + 
          `I'm looking forward to our upcoming strategy session to go over your property goals.\n\n` +
          `Before we sync up, did any quick questions pop up about the neighborhood, local market data, or specific listings you've been tracking online?\n\n` +
          `Just reply straight to this email if there's anything specific you want me to pull ahead of time.` + 
          signoff;
  
      case 'active':
        return greeting + 
          `We've been keeping a close eye on the market for you, and a few interesting shifts are happening locally.\n\n` +
          `As we keep sorting through inventory, do you have any quick questions about recent listings, pricing adjustments, or neighborhood trends?\n\n` +
          `Just reply straight to this email whenever you have a second and we can fine-tune our search.` + 
          signoff;
  
      case 'under contract':
        return greeting + 
          `Things are moving along beautifully behind the scenes on your contract file.\n\n` +
          `I know there are a lot of moving parts right now during escrow. Did you have any quick questions about the inspection timelines, appraisal parameters, or next steps that I can clarify for you?\n\n` +
          `Just reply straight to this email whenever you have a second—I'm tracking everything closely.` + 
          signoff;
  
      case 'closed':
        return greeting + 
          `Congratulations again on your recent closing! I hope you are settling into the new space perfectly.\n\n` +
          `Now that the dust has settled, I wanted to reach out and see if you had any remaining questions about the home, local utility configurations, or contractors in the area?\n\n` +
          `Just reply straight to this email if anything comes up. I'm always here to help.` + 
          signoff;
  
      case 'archive':
        return greeting + 
          `It's been a little while since we last touched base about your property search parameters.\n\n` +
          `I wanted to quickly check in and see if you had any new questions about the local market trends, or if your home buying timelines have shifted at all recently?\n\n` +
          `Just reply straight to this email whenever you have a second if you'd like to dive back in.` + 
          signoff;
  
      default:
        // Fallback template
        return greeting + 
          `I wanted to personally reach out and check in on your real estate goals.\n\n` +
          `Did you have any quick questions about current listings, neighborhood developments, or local market trends that I can track down for you?\n\n` +
          `Just reply straight to this email whenever you have a second.` + 
          signoff;
    }
  }