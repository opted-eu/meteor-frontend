import ReactMarkdown from 'react-markdown'

const link_collection = `

# Link Collection

This is a collection of online resources that provide useful background and meta information on the media landscape in Europe. All resources are curated by the Meteor Team (WP3 of the OPTED Consortium) and the list is updated irregularly.

## Circulation and Audience Size

### Global

- [International Federation of Audit Bureaux of Circulations](https://www.ifabc.org/members/full-member-list-alphabetically): Registry of circulation monitoring organizations in different countries
- [World Press Trends](https://wan-ifra.org/world-press-trends/): Meta-data Database, member application required. Circulation, readership, revenue, advertising expenditure, digital usage, data for top selling titles in each country

### Austria

- [ÖAK](https://www.oeak.at/auflagedetails/): Circulation of newspapers (Austria)
- [Media Analyse](https://www.media-analyse.at/): Reach per print newspaper (Austria)

### Belgium

- [CIM](https://www.cim.be/): Information about media circulation and reach (Belgium)

### Denmark

- [Danske Medier](https://danskemedier.dk/branchefakta/medieforbrug/oplagskontrol/): Information about media circulation and reach (Denmark)

### Finland

- [Media Audit Finland](https://mediaauditfinland.fi/): Information about media circulation and reach (Finland)

### Germany

- [IVW](https://www.ivw.de/): Circulation of print media (Germany)
- [LAE](https://www.lae.de/): Readership of news media among decision makers (Germany)

### Greece

- [EIHEA](https://www.eihea.gr) Circulation information on print media (Greece)

### Italy

- [ADS](https://www.adsnotizie.it/): Circulation of media (Italy)

## Media Organizations and Ownership

### Global

- [Columbia Journalism Review](http://beta.cjr.org/resources/): Ownership relations of global media organisations (USA, Global)
- [Media Ownership Monitor](http://beta.cjr.org/resources/): Information about media ownership, reporters without borders (Global)
- [OpenCorporates](https://opencorporates.com/): Large record of company registration data (Global)
- [Open Ownership](https://register.openownership.org/): A nonprofit aiming to improve "transparency over who owns and controls companies". Large record of company ownership structures (Global)
- [Media Info](https://media.info/): Information about media companies (UK, Ireland, Australia)

### European Union

- [Business Registers in EU Countries](https://e-justice.europa.eu/106/EN/business_registers_in_eu_countries): Official overview of webportals for company register information (EU)

### Austria

- [Aurelia](https://aurelia.bvdinfo.com/): Detailed information about companies: employees, turnover, date of incorporation, etc. (Austria)
- [FirmenABC](https://www.firmenabc.at/): Information about companies / registered businesses (Austria)
- [Vereinsregister](https://citizen.bmi.gv.at/at.gv.bmi.fnsweb-p/zvn/public/Registerauszug): Registry of clubs or associations. (Austria)

### Belgium

- [BCE](https://kbopub.economie.fgov.be/kbopub/zoeknaamfonetischform.html): Company registry, lookup financial statements, audited accounts (Belgium)

### Bulgaria

- [Bulgarian Business Register](https://portal.registryagency.bg/CR/en/Reports/VerificationPersonOrg): Commercial register and register of non-profit legal entities (Bulgaria)

### Czech Republic

- [Czech Public Register](https://or.justice.cz/ias/ui/rejstrik): Information about companies, associations, trade unions, etc. (Czech Republic)

### Germany

- [KEK-Online](https://www.kek-online.de): Ownership database of news sources (Germany)

### Hungary

- [Hungarian Business Register](https://www.e-cegjegyzek.hu/): Company Register, information on date of incorporation, subsidiaries, etc (Hungary)

### Ireland

- [Media Ownership Ireland](http://mediaownership.ie/): Initiative of the Broadcasting Authority of Ireland provides a structured and searcheable reference database of Irish media outlets (Ireland)

### Spain

- [Infocif](/detail/www.infocif.es): Company Register (Spain)

### United Kingdom

- [Find and update company information](https://find-and-update.company-information.service.gov.uk/): Company registry, lookup financial statements, date of incorporation, ownerships of companies (United Kingdom)

## Press Councils

- [Alliance of Independent Press Councils of Europe](https://presscouncils.eu/Comparative-data-on-media-councils): Press Council Interest Group, providing information on member's press councils (e.g. budgeting, scale)

## Research, Surveys and Polls

- [Eurobarometer polls](https://www.europarl.europa.eu/at-your-service/de/be-heard/eurobarometer): EU survey asking citizens, including media trust per country
- [Digital News Report](https://www.digitalnewsreport.org/): Reuters study on media trust by country
- [Reuters' classification of payment models](https://reutersinstitute.politics.ox.ac.uk/our-research/pay-models-online-news-us-and-europe-2019-update): Reuters Institute funded research on common payment models for news sources
- [Database of Variables for Content Analysis](https://www.hope.uzh.ch/doca/index): The open conditions_of_access database compiles, systematizes and evaluates relevant content-analytical variables of communication and political science research areas and topics.

## Miscellaneous Information about Media

- [Eurotopics](https://www.eurotopics.net/): News aggregator and information about media selected outlets (EU)
- [MediaDB](https://www.mediadb.eu/): Information about the media landscape in German (EU)
- [DieMedien.at](https://diemedien.at/): Background information about media (Austria)

## Alternative Media

- [PSIRAM](https://www.psiram.com/): Wiki of "alternative belief systems". Contains information about various alternative media (English, German, French).

`

function LinkRenderer(props: any) {
    return (
        <a href={props.href} target="_blank" rel="noreferrer">
            {props.children}
        </a>
    );
}

const LinkCollection = () => {
    return (
        <ReactMarkdown components={{ a: LinkRenderer}}>{link_collection}</ReactMarkdown>
    )
};

export default LinkCollection;
