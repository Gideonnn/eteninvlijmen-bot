module.exports = {

  // Help
  help: `
Ik kan jou en je vrienden helpen om jullie wekelijkse diner te plannen.

Je kan me gebruiken door middel van deze commando's:

*Account*
/register - Registreren bij de groep.

*Plannen*
/invullen - Je mogelijke dagen voor deze week doorgeven.

*Etc*
/houdoe - Verlaat de groep. Je zult geen notificaties meer ontvangen.
  `,

  // Start Wizard
  startWizardEnter: `
Welkom bij Eten in Vlijmen. Het activeren van je account werkt \
middels een inlogcode. Vul nu je inlogcode in:
  `,

  startWizardRegisterError: `
Je code lijkt niet te kloppen. Kun je het nog eens proberen?
  `,

  startWizardRegisterSuccess: `
🎉  Welkom bij de club! 🎉

Het is nu mogelijk om deel uit te maken van de planning. Zie de /help \
optie om alle mogelijkheden te verkennen.
  `,

  startWizardNotMe: `
Oké, probeer het nog eens met een andere code a.u.b.
  `,

  // Vote Wizard
  planWizardInstructions: `
Op welke dagen kun je? Gebruik de knoppen op het scherm om dagen te markeren.
  `,

  planWizardSuccess: `
Oke, je mogelijke dagen zijn opgeslagen. Bedankt voor het doorgeven! Gebruik /vote \
om je voorkeur te wijzigen.
  `,

  // Misc
  exitError: `
Er ging iets mis tijdens het uitloggen.
  `,

  exitSuccess: `
Je bent uitgelogd en zal geen notificaties meer ontvangen.
  `,
};
