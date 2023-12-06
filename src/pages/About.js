import Markdown from "react-markdown";

const about_text = `# About

OPTED Meteor is a research platform addresses the increasing demand 
for text analysis tools and training resources among the social science community 
interested in using political texts. 
OPTED Meteor organise and link these resources in a systematic way that makes them easy to 
search, easy to access and easy to utilize. 
For more details on the development of the research platform please visit [opted.eu](https://opted.eu/) 
for more information about the project.

Meteor was originally designed by Work Package 3 ([University of Vienna](https://compcommlab.univie.ac.at/)) 
and further expanded in collaboration with Work Package 9 ([University of Exeter](https://politics.exeter.ac.uk/research/centres/q-step/)) 
and with the contribution of resources from other OPTED Work Packages:

- 3,944 scientific publications studying Citizen Produced Political Texts (CPPT) were contributed by Work Package 2 .(Gelovani et el, 2021).
- 129 text resources for texts by political parties were contributed by Work Package 4 (Greene et al, 2021).
- 195 text resources for legislative texts were contributed by Work Package 5 (Sebők et al, 2021).

## Contact

You can reach us via various means. If you have feedback or questions you 
can either send us an email to \`info at opted.eu\` or also poke us with a 
tweet [@OPTED_H2020](https://twitter.com/OPTED_H2020).

In case some technical aspect is not working you can raise an issue in our 
[GitHub repository](https://github.com/opted-eu).

## Contributors

- Principal Investigator: Univ.-Prof. Hajo Boomgaarden, PhD
- Scientific Team: Dr. Michele Scotto di Vettimo, Paul Balluff, Dr. Fabienne Lind, Marvin Stecker, Celina Dinhopl, Univ.-Prof. Dr. Annie Waldherr, and Prof. Susan Banducci
- Technical Implementation: Paul Balluff & Ian Wellaway

## References

The data on this platform is a collaborative effort of various scholars 
who are part of the OPTED design study: 

- Balluff, P., Lind, F., M., Dinhopl, C., Boomgaarden, H. G., Waldherr, A. (2022). Registry of Data Sources. [OPTED Deliverable (D3.2)]((https://opted.eu/results/project-reports/)). 
- Balluff, P., Stecker, M., Lind, F., Boomgaarden, H. G., & Waldherr, A. (2022). Tool Collection. [OPTED Deliverable (D3.3)]((https://opted.eu/results/project-reports/)). 
- Gelovani, S., Kalsnes B., Koc-Michalska, K., and Theocharis, Y. (2021). An inventory of citizen-produced political texts (CPPT): data, tools, and methodology. [OPTED Devliverable (D2.1)](https://opted.eu/results/project-reports/).
- Greene, Z., Ivanusch, C., Lehmann, P., and Schober T. (2021). A repository of political party and interest group texts. [OPTED Devliverable (D4.2)](https://opted.eu/results/project-reports/).
- Sebők, M., Proksch, S. and Rauh, C. (2021). Review of available parliamentary corpora. [OPTED Devliverable (D5.1)](https://opted.eu/results/project-reports/).
- Scotto di Vettimo, M., Banducci, M., Gelovani, S., Theocharis, Y., & Horvath, L. (2021) Report on a Curation Workflow for the OPTED Platform.

We also used additional references for improving and extending the data on Meteor:

- Bederke, P., Döring, H., Regel, S. (2023). Party Facts [Dataset]. [partyfacts.org](https://partyfacts.herokuapp.com/) (Disambiguate political parties).
- Schwaiger, L. (2022). Gegen die Öffentlichkeit: Alternative Nachrichtenmedien im deutschsprachigen Raum. Bielefeld: transcript Verlag. [10.1515/9783839461211](https://www.transcript-open.de/isbn/6121) (List of alternative media for German speaking countries).

# Conditions of Use

## Data Licencing

Meteor is published under the [CC-BY-SA 4.0 license](https://creativecommons.org/licenses/by-sa/4.0/deed.en). 
This means you are free to share and adapt Meteor data, 
as long as you provide proper attribution and use the same license for 
redistribution or derivate works. 

*Note that this does **not** apply to the individual resources that Meteor links to.*

## Citation Requirements

If you are using Meteor as a dataset, please use the following citations:

- Balluff, P., Lind, F., M., Dinhopl, C., Boomgaarden, H. G., Waldherr, A. (2022). Registry of Data Sources. [OPTED Deliverable (D3.2)]((https://opted.eu/results/project-reports/)). 
- Balluff, P., Stecker, M., Lind, F., Boomgaarden, H. G., & Waldherr, A. (2022). Tool Collection. [OPTED Deliverable (D3.3)]((https://opted.eu/results/project-reports/)). 
- Gelovani, S., Kalsnes B., Koc-Michalska, K., and Theocharis, Y. (2021). An inventory of citizen-produced political texts (CPPT): data, tools, and methodology. [OPTED Devliverable (D2.1)](https://opted.eu/results/project-reports/).
- Greene, Z., Ivanusch, C., Lehmann, P., and Schober T. (2021). A repository of political party and interest group texts. [OPTED Devliverable (D4.2)](https://opted.eu/results/project-reports/).
- Sebők, M., Proksch, S. and Rauh, C. (2021). Review of available parliamentary corpora. [OPTED Devliverable (D5.1)](https://opted.eu/results/project-reports/).
- Scotto di Vettimo, M., Banducci, M., Gelovani, S., Theocharis, Y., & Horvath, L. (2021) Report on a Curation Workflow for the OPTED Platform.

# Coverage of Meteor

Meteor is a continuously growing database and depends on the contributions 
of other OPTED Work Packages as well as of individual users. 
While there is a small team working on adding new entries and reviewing contributions, 
there is still much work to be done. This registry does not have complete coverage of all 
political text resources, text analysis tools, and training materials useful for the study 
of political processes in Europe.

Nevertheless, we encourage all users to contribute entries to Meteor. 
Even if it is only a few new datasets, inventories, papers or your 
favourite text analysis tool. If you are not sure where to start, 
just drop us an email or tweet and we are happy to help.

`

const About = () => {
    return (
        <Markdown>{about_text}</Markdown>
    )
};

export default About;
