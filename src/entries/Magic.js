import React, { useState } from 'react';
import '@material/web/textfield/filled-text-field.js'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/button/filled-button.js';
import '@material/web/checkbox/checkbox.js'
import '@material/web/button/text-button.js';
import '@material/web/progress/circular-progress.js';
import Select from "react-select";

export default function Magic({fillForm}) {

    const [api, setApi] = useState();
    const [identifier, setIdentifier] = useState();

    const doi_regex = new RegExp("^10.\\d{4,9}\/[-._;()/:A-Z0-9]+$", "i")
    const stdErrMsg = "" +
        "There was an error when we tried to fetch the data from an API. Could you please check very carefully the DOI, arXiv, or package name? After you checked, please try again.\n" +
        "\n" +
        "Please also note that it does not always work smoothly and the APIs that we use here are out of our control.\n"

    const options = [
        {value: 'doi', label: 'DOI'},
        {value: 'cran', label: 'Cran'},
        {value: 'instagram', label: 'Instagram'},
        {value: 'telegram', label: 'Telegram'},
        {value: 'twitter', label: 'Twitter'},
        {value: 'vk', label: 'VK'},
        {value: 'website', label: 'Website'},
        {value: 'pypi', label: 'PyPI'},
        {value: 'github', label: 'Github'},
        {value: 'arxiv', label: 'ArXiv'},
        {value: 'wikidata_id', label: 'Wikidata'},
        {value: 'openalex', label: 'OpenAlex'},
    ]

    // apply styles to select boxes
    const SelectStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: "#000000",
        }),
        container: provided => ({
            ...provided,
            display: "inline-block",
            width: '100%',
            marginBottom: '10px'
        })
    };

    const TextStyles = {
        width: '100%',
        marginBottom: '10px'
    };

    const handleSubmit = async e => {
        e.preventDefault();
        let buttonText = document.getElementById('magic-text')
        let buttonProgress = document.getElementById('magic-progress')
        buttonText.innerText = ''
        buttonProgress.style.display = 'block'
        //console.log(api, identifier)
        let params = null
        let check = ''
        let resp = 'No response'
        let apiUrl = ''
        let error = false
        switch (api){
            case 'doi':
                // sanitize identifier string
                let doi = identifier.replace("https://doi.org/", "")
                doi = doi.replace("http://doi.org/", "")
                doi = doi.replace("doi.org/", "")

                // check regex
                if (!doi_regex.test(doi)) {
                    setMagicMessage('DOI Invalid!')
                    buttonProgress.style.display = 'none'
                    buttonText.innerText = 'Magic'
                    return false
                }

                // check if already in inventory
                check = await getInventory(api, doi);
                checkInventory(check)

                // get data
                params = {
                    "fresh": true,
                    "identifier": identifier
                }
                resp = await getExternal(api, params);

                break;

            case 'cran':
                // sanitize identifier string
                let cran = identifier.replace('https://cran.r-project.org/web/packages/', '')
                cran = cran.replace('http://cran.r-project.org/web/packages/', '')
                cran = cran.replace('/index.html', '')
                cran = cran.replace('https://CRAN.R-project.org/package=', '')
                cran = cran.replace('https://cran.r-project.org/package=', '')

                // check if already in inventory
                check = await getInventory(api, cran);
                checkInventory(check)

                params = {
                    "package": identifier
                }
                resp = await getExternal(api, params);

                break;
            case 'instagram':
            case 'telegram':
            case 'twitter':
            case 'vk':

                // check if already in inventory
                check = await getInventory(api, identifier);
                checkInventory(check)

                params = {
                    "handle": identifier
                }
                resp = await getExternal(api, params);

                break;

            case 'website':
                params = {
                    "url": identifier
                }
                resp = await getExternal(api, params);
                break;

            case 'arxiv':

                // sanitize identifier string
                let arxiv = identifier.replace('https://arxiv.org/abs/', '')
                arxiv = arxiv.replace('http://arxiv.org/abs/', '')
                arxiv = arxiv.replace('arxiv.org/abs/', '')
                arxiv = arxiv.replace('abs/', '')

                apiUrl = "https://export.arxiv.org/api/query?id_list="

                // check if already in inventory
                check = await getInventory(api, arxiv);
                checkInventory(check)

                // get data
                resp = await getArXiv(apiUrl, arxiv, error, fillForm);

                break

            case 'pypi':

                // sanitize identifier string
                let pypi = identifier.replace("https://pypi.org/project/", "")
                pypi = pypi.replace('http://pypi.org/project/', '')
                pypi = pypi.replace('pypi.org/project/', '')
                pypi = pypi.replace('project/', '')

                apiUrl = "https://pypi.org/pypi/"

                // check if already in inventory
                check = await getInventory(api, pypi);
                checkInventory(check)

                // get data
                resp = await getPyPi(apiUrl, pypi, error, fillForm);

                break

            case 'github':

                // sanitize identifier string
                let github = identifier.replace('https://www.github.com/', '')
                github = github.replace('http://www.github.com/', '')
                github = github.replace('www.github.com/', '')
                github = github.replace('https://github.com/', '')
                github = github.replace('http://github.com/', '')
                github = github.replace('github.com/', '')

                apiUrl = "https://api.github.com/repos/"

                // check if already in inventory
                check = await getInventory(api, github);
                checkInventory(check)

                // get data
                resp = await getGithub(apiUrl, github, error, fillForm);

                break

            case 'openalex':

                // sanitize identifier string
                let openalex = identifier.replace('https://openalex.org/works/', '')
                openalex = openalex.replace('https://openalex.org/authors/', '')
                openalex = openalex.replace('openalex.org/authors/', '')
                openalex = openalex.replace('openalex.org/works/', '')
                openalex = openalex.replace('authors/', '')
                openalex = openalex.replace('works/', '')

                apiUrl = "https://api.openalex.org/"

                // check if already in inventory
                check = await getInventory(api, openalex);
                checkInventory(check)

                // get data
                resp = await getOpenAlex(apiUrl, openalex, error, fillForm);

                break

            case 'wikidata_id':

                // sanitize identifier string
                let wikidata = identifier.replace('https://openalex.org/works/', '')
                wikidata = wikidata.replace('https://openalex.org/authors/', '')
                wikidata = wikidata.replace('openalex.org/authors/', '')
                wikidata = wikidata.replace('openalex.org/works/', '')
                wikidata = wikidata.replace('authors/', '')
                wikidata = wikidata.replace('works/', '')

                apiUrl = "https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&languages=en&origin=*&ids="

                // check if already in inventory
                check = await getInventory(api, wikidata);
                checkInventory(check)

                // get data
                resp = await getWikidata(apiUrl, wikidata, error, fillForm);

                break

            default:
                // do nothing

        }

        buttonProgress.style.display = 'none'
        buttonText.innerText = 'Magic'
        //console.log(resp)
    }

    const setMagicMessage = (msg) => {
        let magicMessage = document.getElementById('magic-message')
        magicMessage.innerText = msg
    }

    const setMagicDuplicate = (msg) => {
        let magicDuplicate = document.getElementById('magic-duplicate')
        magicDuplicate.innerText = msg
    }

    async function getArXiv(apiUrl, identifier) {
        let p = apiUrl + identifier
        return fetch(p)
            .then(response => response.text())
            .then(xml => parseArXiv(xml))
            .then(result => fillForm(result))
            .then(_ => setMagicMessage('Data Loaded!'))
            .catch(err => {
                setMagicMessage(stdErrMsg)
                console.log(err)
            });
    }

    async function getGithub(apiUrl, identifier) {
        let p = apiUrl + identifier
        return fetch(p)
            .then(response => response.json())
            .then(json => parseGithub(json))
            .then(result => fillForm(result))
            .then(_ => setMagicMessage('Data Loaded!'))
            .catch(err => {
                setMagicMessage(stdErrMsg)
                console.log(err)
            });
    }

    async function getOpenAlex(apiUrl, identifier) {
        let p = apiUrl + identifier
        return fetch(p)
            .then(response => response.json())
            .then(json => parseOpenAlex(json))
            .then(result => fillForm(result))
            .then(_ => setMagicMessage('Data Loaded!'))
            .catch(err => {
                setMagicMessage(stdErrMsg)
                console.log(err)
            });
    }

    async function getWikidata(apiUrl, identifier) {
        let p = apiUrl + identifier
        return fetch(p)
            .then(response => response.json())
            .then(json => parseWikidata(json, identifier))
            .then(result => fillForm(result))
            .then(_ => setMagicMessage('Data Loaded!'))
            .catch(err => {
                setMagicMessage(stdErrMsg)
                console.log(err)
            });
    }

    async function getPyPi(apiUrl, identifier) {
        let p = apiUrl + identifier + '/json'
        return fetch(p)
            .then(response => response.json())
            .then(json => parsePyPi(json))
            .then(result => fillForm(result))
            .then(_ => setMagicMessage('Data Loaded!'))
            .catch(err => {
                setMagicMessage(stdErrMsg)
                console.log(err)
            });
    }

    async function getExternal(api, params) {
        return fetch(process.env.REACT_APP_API + 'external/' + api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(data => data.json())
            .then(async result => {
                //console.log(result)
                if (result.message){
                    setMagicMessage(result.message)
                } else {
                    // fix authors_fallback (Cran)
                    if (api === 'cran'){
                        //console.log('cran1', result)
                        result = await parseCran(result)
                        //console.log('cran2', result)
                    }
                    fillForm(result)
                    setMagicMessage('Data Loaded!')
                }
            })
            .catch(err => {
                setMagicMessage(stdErrMsg)
                console.log(err)
            });
    }

    async function getInventory(api, identifier) {
        return fetch(process.env.REACT_APP_API + 'lookup?predicate=' + api + '&query=' + identifier)
            .then(response => response.json())
    }

    function checkInventory(data) {
        if (data.length > 0) {
            let identifier = data[0].doi
            let msg = 'This entry is already in the inventory! '
            if (identifier){
                msg += 'You can find it by entering the identifier:\n' + identifier + '\n...in the search box above'
            } else {
                msg += 'You can find it using the advanced search feature.'
            }
            setMagicDuplicate(msg)
        }
    }


    const handleChange = (selectedOption) => {
        setApi(selectedOption.value)
    };

    return(

        <div className={'magic'}>
            <h4>Magically fill in the form</h4>
            <p>If you provide a DOI, arXiv, Python module (PyPI), R-Package name, or GitHub repository, the inventory tries to get some data automatically!</p>

            <form onSubmit={handleSubmit}>
                <Select
                    styles={SelectStyles}
                    options={options}
                    closeMenuOnSelect={true}
                    placeholder={"Choose..."}
                    required
                    onChange={handleChange}
                />

                <md-filled-text-field
                    style={TextStyles}
                    name="name"
                    placeholder="Identifier or package name"
                    onBlur={event => {
                        setIdentifier(event.target.value)
                    }}
                    required
                />

                <div id='magic-duplicate' className='error'></div>
                <div id='magic-message' className='message'></div>


                <div align='right'>
                    <md-filled-button type="submit" id='magic-button'>
                        <md-circular-progress
                            style={{display:'none'}}
                            id='magic-progress'
                            indeterminate
                            aria-label="Loading, please wait">
                        </md-circular-progress>
                        <span id='magic-text'>Magic</span>
                    </md-filled-button>
                </div>

            </form>

        </div>

    )

}

async function parseArXiv(xml) {

    let parser = new DOMParser()

    let publication = parser.parseFromString(xml, 'text/xml')

    let total_result = publication.getElementsByTagName('opensearch:totalResults')[0].innerHTML
    if (!total_result) {
        total_result = publication.getElementsByTagName('opensearch:totalresults')[0].innerHTML
    }

    if (parseInt(total_result) < 1) {
        return false
    }

    publication = publication.getElementsByTagName('entry')[0]

    let result = new Object()

    result['arxiv'] = publication.getElementsByTagName('id')[0].innerHTML

    result['url'] = result['arxiv']

    result['arxiv'] = result['arxiv'].replace('http://arxiv.org/abs/', '').replace('https://arxiv.org/abs/', '')

    result['name'] = publication.getElementsByTagName('title')[0].innerHTML

    result['title'] = result['name']

    let authors = []

    for (var author of publication.getElementsByTagName('author')) {
        let author_raw = author.getElementsByTagName('name')[0].innerHTML
        author_raw = author_raw.split(' ')
        let name1 = author_raw.pop()
        let name2 = author_raw.join(" ")
        let author_name = name2 + ' ' + name1

        let ret = await getAuthor(author_name)

        //console.log(ret)
        if (ret){
            authors.push(ret[0])
        }
    }
    //result['authors'] = authors.join(';')
    result['authors'] = authors

    result['date_published'] = publication.getElementsByTagName('published')[0].innerHTML.split('-')[0]

    result['description'] = publication.getElementsByTagName('summary')[0].innerHTML.trim()

    return result
}

async function parseCran(result){
    if (!result['authors']) {
        let authors = []
        for (var author of result._authors_fallback) {
            let author_name = ''
            if (author.includes(',')) {
                let author_names = author.split(',')
                author_name = author_names[1] + ' ' + author_names[0]
            } else {
                author_name = author
            }
            author_name = author_name.trim()

            let ret = await getAuthor(author_name)

            //console.log('ret', ret)
            if (ret.length > 0 && ret !== 'undefined') {
                authors.push(ret[0])
            }
        }
        //result['authors'] = authors.join(';')
        if (authors.length > 0) {
            result['authors'] = authors
        }
    }
    return result
}

function getAuthor(author_name){
    //console.log(author_name)
    let api = process.env.REACT_APP_API + "lookup?predicate=name&dgraph_types=Author&query=\"" + encodeURIComponent(author_name) + "\""
    let openalex_url = 'https://api.openalex.org/authors?filter=display_name.search:' + encodeURIComponent(author_name)
    return Promise.all([
        fetch(api)
            .then(response => response.json())
            .then(function(results) {
                let newArray = []
                results.forEach((e) => {
                    newArray.push(e)
                })
                return newArray
            }),
        fetch(openalex_url).then(response => response.json())
            .then(j => j.results)
            .then(function (results) {
                let newArray = []
                results.forEach((e) => {
                    e.name = e.display_name
                    e.openalex = e.id
                    e.uid = e.id.replace("https://openalex.org/", "")
                    e.affiliations = [e.hint]
                    if (e.external_id) {
                        e.affiliations.push(e.external_id.replace('https://orcid.org/', ' (ORCID: ') + ')')
                    }
                    e.type = "Openalex"
                    newArray.push(e)
                })
                return newArray
            })
    ])
        .then((arrayOfArrays) => {
            return [].concat.apply([], arrayOfArrays);
        })
}

function parseWikidata(js, id){

    let pack = null

    try {
        pack = js['entities'][id]
    } catch (e) {
        return
    }

    let result = new Object()

    try {
        result['name'] = pack['labels']['en']['value']
    } catch (e) {
        //console.log(e)
    }

    try {
        result['description'] = pack['descriptions']['en']['value']
    } catch (e) {
        //console.log(e)
    }

    try {
        let alternates = pack['aliases']['en']
        let alternate_names = []
        for (let a of alternates){
            alternate_names.push(a['value'])
        }
        if (alternate_names.length > 0) {
            result['alternate_names'] = alternate_names
        }
    } catch (e) {
        //console.log(e)
    }
    let keys = Object.keys(result)
    if (keys.length > 0) {
        return result
    }
}

async function parseOpenAlex(pack) {

    let result = new Object()

    result['name'] = pack['display_name']
    result['alternate_names'] = pack['display_name_alternatives']
    result['orcid'] = pack['orcid']
    let id = pack['id'].split('/')
    result['openalex'] = id[id.length - 1]

    // Works
    if ('doi' in pack) {
        let doi = pack['doi']
        doi = doi.replace("http://doi.org/", "")
        doi = doi.replace("https://doi.org/", "")
        result['doi'] = doi
    }
    if ('published_year' in pack) {
        result['date_published'] = pack['published_year']
    }
    if ('title' in pack) {
        result['title'] = pack['title']
    }
    if ('type_crossref' in pack) {
        result['paper_kind'] = pack['type_crossref']
    }
    if ('open_access' in pack) {
        let oa = null
        if (pack['open_access']['is_oa']) {
            oa = 'yes'
        } else {
            if (pack['open_access']['is_oa'] === false) {
                oa = 'no'
            }
        }
        result['open_source'] = oa
    }
    if ('authorships' in pack) {
        let authors = []
        for (let a of pack['authorships']) {
            let author_name = a['author']['display_name']
            author_name = author_name.trim()

            let ret = await getAuthor(author_name)

            //console.log('ret', ret)
            if (ret.length > 0 && ret !== 'undefined') {
                authors.push(ret[0])
            }
        }
        if (authors.length > 0) {
            result['authors'] = authors
        }
    }

    return result
}

function parseGithub(pack) {

    let result = new Object()

    result['name'] = pack['name']
    result['github'] = pack['full_name']
    result['title'] = pack['name']
    if ('home_page' in pack) {
        result['url'] = pack['home_page']
    } else {
        result['url'] = 'https://github.com/' + pack['full_name']
    }
    if (pack.license != null) {
        result['license'] = pack.license['name']
    }
    if ('created_at' in pack) {
        let year = pack.created_at.split('-')[0]
        if (parseInt(year)) {
            result['date_published'] = year
        }
    }

    if ('language' in pack) {
        result['programming_languages'] = [pack.language.toLowerCase()]
    }
    result['open_source'] = ['yes']
    result['conditions_of_access'] = ['free']
    return result
}

function parsePyPi(pack) {

    let github_regex = new RegExp("https?://github\.com/(.*)")

    let result = new Object()

    result['name'] = pack.info['name']
    result['pypi'] = pack.info['name']
    result['title'] = pack.info['name']
    result['alternate_names'] = pack.info['summary']
    result['description'] = pack.info['description']
    result['url'] = pack.info['home_page']
    result['authors'] = pack.info['author']
    result['license'] = pack.info['license']
    result['version'] = pack.info['version']
    result['documentation'] = []
    for (let url in pack.info['project_urls']) {
        let material_url = pack.info.project_urls[url]
        if (material_url.match(github_regex)) {
            let github = material_url.match(github_regex)[1]
            if (github.endsWith('/issues')) {
                github.replace('/issues', '')
            }
            result['github'] = github
        } else {
            result['documentation'].push(material_url)
        }
    }

    result['programming_languages'] = ['python']
    result['platform'] = ['windows', 'linux', 'macos']
    result['open_source'] = ['yes']
    result['conditions_of_access'] = ['free']
    return result
}