import ReactMarkdown from 'react-markdown'

const newssource_guide = `
# Detailed Guide for adding News Sources

Thank you for participating!

## What is included in this inventory?

Before you start, please carefully read the following instructions to learn about the type of news sources we are looking for:

News texts are nowadays produced by diverse groups of actors and are accessible in various formats and via various channels. For the OPTED inventory of European news sources, we focus on a specific type of news producing sources. Please carefully read the following definition.

**By news sources, we mean sources that:**

- have the primary purpose to regularly report and comment on recent events and ideas 
- produce (self-create) textual content
- claim to be non-fictional
- can be regarded as a rather complex organisations and has standardized practises (not a one-man or one women operation)

**Important, we look for:**

- Sources mainly associated with EU countries + UK, Switzerland, Norway, and Israel
- Sources that are actively publishing today.
- The channel counts: e.g., Spiegel print and spiegel online are listed as separate sources
- Various regional print editions are included as separate sources if the individual region is as wide-reaching as a country (e.g., 'Zeit' and 'Zeit Österreich' are considered 2 separate sources). If the regions are subnational units, only the main source is included (e.g., 'Badische Zeitung' had 9 editions for small geographic units (e.g. Badische Zeitung Elztal', 'Badische Zeitung Freiburg'), it is only included once as 'Badische Zeitung' in the inventory.
- Various social media accounts of a news source are included asseparate sources
- Please provide information about the sources that are correct for the moment (to the best of your knowledge) in which you enter the information.

**More specifically the inventory includes:**

- Print news sources
- Online news sources
- Websites that provide transcripts to self-created audiovisual contents (tv, radio, or podcasts)
- News agencies (e.g., Reuters, AFP, AP)
- Social media accounts providing news, self-created textual content
- Messaging apps providing news, self-created textual content
- Sources for multinational audiences (e.g., [www.euronews.com](https://www.euronews.com)), national audiences (e.g., [www.derstandard.at](/detail/newssource_at_wwwderstandardat_website)), and subnational audiences (i.e., for a region or city, e.g., [www.standard.co.uk](/detail/newssource_gb_wwwstandardcouk_website))
- News blogs that are published by a group of people (i.e. different authors, appears to be created with editorial support, see for example [www.nachdenkseiten.de](/detail/newssource_de_wwwnachdenkseitende_website), [globalvoices.org](/detail/newssource_globalvoicesorg_website))
- Alternative news media sources (i.e., propagate that they provide an alternative view in contrast to mainstream media, e.g., [order-order.com](/detail/newssource_gb_orderordercom_website) )

**Please note, the inventory does not include:**

- News aggregation sites (e.g. Google news, Apple News, Upday, Flipboard)
- Citizen journalism (i.e., news blogs by individuals, without any notion of editorial control)
- Sources clearly related_news_sources to corporations, foundations, think tanks, universities, advocacy groups (often .org website urls)
- Sources with a main focus on celebrities, sport, travel, music, arts, movies, event announcements, highly specific industries
- Social media accounts only sharing news that were created by others (e.g., a private account sharing links to articles from a newspaper)
- Collective political actors (e.g., parties, governments) and (political) advertisement/public relations

## List of credible resources

We provide a [curated and growing list of resources](/link-collection) that we found useful for adding entries to the inventory.

##Audience Size for Print Newspapers

Getting detailed information about the reach of a printed news source can be challenging. However, there are interest groups that collect such data and sometimes make it available for public.

Visit the [International Federation of Audit Bureaux of Circulations](https://www.ifabc.org/members/full-member-list-alphabetically) to find an appropriate source for many European countries. E.g., for Austria the [OEAK](https://www.oeak.at/auflagedetails/) or Germany the [IVW](https://www.ivw.eu/print/print).

## Publication Kind: What label or labels describe the main source?

This variable points to the main product. For example, if you enter a website for an online newspaper, select newspaper. For example, if you enter a social media account that is related_news_sources to a TV show, select TV show. We only use the labels that the news source uses to describe itself. For newspapers or TV shows, this is often clear and does not need too much consideration. The first thing to check is are the "about me" or "imprint" pages.

For some cases, labels need to be inferred. This means that we look for specific key phrases to categorize difficult cases

## News Sites

News sites are digitally native news formats which are highly professionally maintained. They typically label themselves as "news portal", "digital news", "news platform". Not to be confused with "news aggreators" which do not offer news, but just link to them (e.g., Google News).

##Alternative Media

This type of publication is probably the hardest to identitfy. For Meteor, we do not have a set catalogue of content criteria (of the news articles) that classify a news source as "alternative news". As mentioned, we use the labels that the news source uses to describe itself. Therefore, if a news source states about itself that it provides an "alternative" coverage, view, perspective, or topics then this is already sufficient for classification.

Other phrases that fall into the label of "alternative media" include (not limited):

- "against the mainstream"
- "providing the truth" (as opposed to other media)
- "reporting on what the mass media does not"
- "not part of the establishement"
- "not part of the media system"
- "against traditional forms of journalism"

There are many cases where the self-description does not mention any of this, but you would still get the impression that this news outlet somehow belongs into the category "alternative media". However, in such cases we would avoid using the label "alternative media" as much as possible. Instead we would use the label that most accurately matches the self-description of the news source.

## News Blog

Many blogs already carry the label in its title, they typically comment on other news and are highly opionated. They provide some kind of third-party interpretation of news. If "blog" is not in the source's title, then we look at its self description. If it includes that the news source mainly provides commentary on other news, then it falls into the category of "news blog".

`
function LinkRenderer(props: any) {
    return (
        <a href={props.href} target="_blank" rel="noreferrer">
            {props.children}
        </a>
    );
}

const GuidesNewssource = () => {
    return (
        <ReactMarkdown components={{ a: LinkRenderer}}>{newssource_guide}</ReactMarkdown>
    )
};

export default GuidesNewssource;
