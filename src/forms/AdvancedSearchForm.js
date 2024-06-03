import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import '@material/web/button/filled-button.js';
import '@material/web/textfield/filled-text-field.js'
import SearchSelectBox from "./SearchSelectBox";
import SearchRadioButtons from "./SearchRadioButtons";
import SearchAsyncSelectBox from "./SearchAsyncSelectBox";
import {Tooltip} from "@mui/material";
import TypeDescription from "../components/TypeDescription";
import SearchCheckbox from "./SearchCheckbox";

const AdvancedSearchForm = ({ searchParams }) => {

    /*
        Displays form inputs

        TO ADD MORE FILTERS:
            Five main types. In each case use the example as a guide to adding a new filter
                a) Select box of choices
                    i) List of dictionaries
                        E.g. languages
                    ii) Single dictionary
                        E.g. channel_epaper
                b} Asynchronous selection: User types in a word/name which is immediately queries in the database
                       E.g. sources_included
                c) Boolean: a checkbox
                    E.g. defunct
                d) Text
                    E.g. free_text
                e) Year
                    i) Single Year
                        E.g. date_founded
                    ii) Year with maths operators (greater than, less than, etc)
                        E.g. audience_size_count

            NB. The 'And/Or' radio buttons are termed 'logic' operators and named as such
    */

    const [extraFilters, setExtraFilters] = useState(true)
    const navigate = useNavigate();

    // Show 'Extra Filters' button for these types
    const extraFiltersTypes = [
        'JournalisticBrand',
        'PoliticalParty',
        'Collection',
        'Dataset',
        'Archive',
        'NewsSource',
        'Tool',
        'ScientificPublication',
        'Government',
        'Parliament',
        'Organization'
    ]

    // 1a. add each search field
    //apiField['**form_field**'] = **API querystring**
    let apiField = {}
    apiField['countries_logic'] = 'countries*connector'
    apiField['entity'] = 'dgraph.type'
    apiField['countries'] = 'countries'
    apiField['free_text'] = '_terms'
    apiField['channel'] = 'channel'
    apiField['languages'] = 'languages'
    apiField['languages_logic'] = 'languages*connector'
    apiField['text_types'] = 'text_types'
    apiField['texttypes_logic'] = 'text_types*connector'
    apiField['sources_included'] = 'sources_included'
    apiField['sources_included_logic'] = 'sources_included*connector'
    apiField['entries_included'] = 'entries_included'
    apiField['entries_included_logic'] = 'entries_included*connector'
    apiField['designed_for'] = 'designed_for'
    apiField['designed_for_logic'] = 'designed_for*connector'
    apiField['subnational'] = 'subnational'
    apiField['subnational_logic'] = 'subnational*connector'
    apiField['subunits'] = 'subnational_scope'
    apiField['subunits_logic'] = 'subnational_scope*connector'
    apiField['country'] = 'country'
    apiField['name_abbrev'] = 'name_abbrev'
    apiField['concept_variables'] = 'concept_variables'
    apiField['concept_variables_logic'] = 'concept_variables*connector'
    apiField['modalities'] = 'modalities'
    apiField['modalities_logic'] = 'modalities*connector'
    apiField['geographic_scope'] = 'geographic_scope'
    apiField['geographic_scope_logic'] = 'geographic_scope*connector'
    apiField['conditions_of_access'] = 'conditions_of_access'
    apiField['fulltext_available'] = 'fulltext_available'
    apiField['meta_variables'] = 'meta_variables'
    apiField['meta_variables_logic'] = 'meta_variables*connector'
    apiField['text_units'] = 'text_units'
    apiField['text_units_logic'] = 'text_units*connector'
    apiField['date_published'] = 'date_published'
    apiField['date_published_operator'] = 'date_published*operator'
    apiField['date_founded'] = 'date_founded'
    apiField['party_affiliated'] = 'party_affiliated'
    apiField['ownership_kind'] = 'ownership_kind'
    apiField['channels'] = 'channels'
    apiField['channels_logic'] = 'channels*connector'
    apiField['methodologies'] = 'methodologies'
    apiField['methodologies_logic'] = 'methodologies*connector'
    apiField['datasets_used'] = 'datasets_used'
    apiField['datasets_used_logic'] = 'datasets_used*connector'
    apiField['publication_kind'] = 'publication_kind'
    apiField['publication_kind_logic'] = 'publication_kind*connector'
    apiField['payment_model'] = 'payment_model'
    apiField['reverse_sources_included'] = '~sources_included'
    apiField['reverse_sources_included_logic'] = '~sources_included*connector'
    apiField['verified_account'] = 'verified_account'
    apiField['transcript_kind'] = 'transcript_kind'
    apiField['website_allows_comments'] = 'website_allows_comments'
    apiField['special_interest'] = 'special_interest'
    apiField['topical_focus'] = 'topical_focus'
    apiField['topical_focus_logic'] = 'topical_focus*connector'
    apiField['publication_cycle'] = 'publication_cycle'
    apiField['contains_ads'] = 'contains_ads'
    apiField['channel_epaper'] = 'channel_epaper'
    apiField['defunct'] = 'defunct'
    apiField['audience_size_unit'] = 'audience_size|unit'
    apiField['audience_size_count'] = 'audience_size|count'
    apiField['audience_size_count_operator'] = 'audience_size|count*operator'
    apiField['audience_size_recent_unit'] = 'audience_size_recent|unit'
    apiField['used_for'] = 'used_for'
    apiField['used_for_logic'] = 'used_for*connector'
    apiField['programming_languages'] = 'programming_languages'
    apiField['programming_languages_logic'] = 'programming_languages*connector'
    apiField['platforms'] = 'platforms'
    apiField['platforms_logic'] = 'platforms*connector'
    apiField['open_source'] = 'open_source'
    apiField['graphical_user_interface'] = 'graphical_user_interface'
    apiField['language_independent'] = 'language_independent'
    apiField['input_file_format'] = 'input_file_format'
    apiField['input_file_format_logic'] = 'input_file_format*connector'
    apiField['output_file_format'] = 'output_file_format'
    apiField['output_file_format_logic'] = 'output_file_format*connector'
    apiField['author_validated'] = 'author_validated'
    apiField['validation_dataset'] = 'validation_dataset'
    apiField['validation_dataset_logic'] = 'validation_dataset*connector'


    // 1b: initialise 'initial**Type**' vars
    // These are the initial settings for the state vars
    let initialEntities = ''
    let initialCountries = ''
    let initialCountriesLogic = ''
    let initialText = ''
    let initialChannel = ''
    let initialLanguages = ''
    let initialLanguagesLogic = ''
    let initialTexttypes = ''
    let initialTexttypesLogic = ''
    let initialSourcesIncluded = ''
    let initialSearchSourcesIncluded = []
    let initialSourcesIncludedLogic = ''
    let initialEntriesIncluded = ''
    let initialSearchEntriesIncluded = []
    let initialEntriesIncludedLogic = ''
    let initialDesignedFor = ''
    let initialSearchDesignedFor = []
    let initialDesignedForLogic = ''
    let initialSubnational = ''
    let initialSearchSubnational = []
    let initialSubnationalLogic = ''
    let initialSubunits = []
    let initialSubunitsLogic = ''
    let initialCountry = ''
    let initialNameAbbrev = ''
    let initialConceptVariables = []
    let initialConceptVariablesLogic = ''
    let initialModalities = []
    let initialModalitiesLogic = ''
    let initialGeographicScope = []
    let initialGeographicScopeLogic = ''
    let initialConditionsOfAccess = []
    let initialFulltextAvailable = ''
    let initialFulltextAvailableChk = false
    let initialMetaVariables = []
    let initialMetaVariablesLogic = ''
    let initialTextUnits = []
    let initialTextUnitsLogic = ''
    let initialDatePublished = ''
    let initialDatePublishedOperator = ''
    let initialDateFounded = ''
    let initialPartyAffiliated = ''
    let initialOwnershipKind = ''
    let initialChannels = []
    let initialChannelsLogic = ''
    let initialMethodologies = []
    let initialMethodologiesLogic = ''
    let initialDatasetsUsed = []
    let initialDatasetsUsedLogic = ''
    let initialPublicationKind = []
    let initialPublicationKindLogic = ''
    let initialPaymentModel = ''
    let initialReverseSourcesIncluded = []
    let initialReverseSourcesIncludedLogic = ''
    let initialVerifiedAccount = ''
    let initialVerifiedAccountChk = false
    let initialTranscriptKind = ''
    let initialWebsiteAllowsComments = ''
    let initialSpecialInterest = ''
    let initialSpecialInterestChk = false
    let initialTopicalFocus = []
    let initialTopicalFocusLogic = ''
    let initialPublicationCycle = ''
    let initialContainsAds = ''
    let initialChannelEpaper = ''
    let initialDefunct = ''
    let initialDefunctChk = false
    let initialAudienceSizeUnit = ''
    let initialAudienceSizeCount = ''
    let initialAudienceSizeCountOperator = ''
    let initialAudienceSizeRecentUnit = ''
    let initialUsedFor = []
    let initialUsedForLogic = ''
    let initialProgrammingLanguages = []
    let initialProgrammingLanguagesLogic = ''
    let initialPlatforms = []
    let initialPlatformsLogic = ''
    let initialOpenSource = ''
    let initialGraphicalUserInterface = ''
    let initialGraphicalUserInterfaceChk = false
    let initialLanguageIndependent = ''
    let initialLanguageIndependentChk = false
    let initialInputFileFormat = []
    let initialInputFileFormatLogic = ''
    let initialOutputFileFormat = []
    let initialOutputFileFormatLogic = ''
    let initialAuthorValidated = ''
    let initialValidationDataset = []
    let initialValidationDatasetLogic = ''

    // 1c: check searchParams var and assign to 'initial' vars
    for (let param of searchParams) {
        switch (param[0]){
            // predicates
            case apiField['entity']:
                initialEntities += '&' + param[0] + '=' + param[1]
                break;
            case apiField['countries']:
                initialCountries += '&' + param[0] + '=' + param[1]
                break;
            case apiField['free_text']:
                initialText += '&' + param[0] + '=' + param[1]
                break;
            case apiField['channel']:
                initialChannel += '&' + param[0] + '=' + param[1]
                break;
            case apiField['languages']:
                initialLanguages += '&' + param[0] + '=' + param[1]
                break;
            case apiField['text_types']:
                initialTexttypes += '&' + param[0] + '=' + param[1]
                break;
            case apiField['subunits']:
                initialSubunits += '&' + param[0] + '=' + param[1]
                break;
            case apiField['sources_included']:
                initialSourcesIncluded += '&' + param[0] + '=' + param[1]
                initialSearchSourcesIncluded[initialSearchSourcesIncluded.length] = {name: "Country"+initialSearchSourcesIncluded.length , uid: param[1]}
                break;
            case apiField['entries_included']:
                initialEntriesIncluded += '&' + param[0] + '=' + param[1]
                initialSearchEntriesIncluded[initialSearchEntriesIncluded.length] = {name: "Country"+initialSearchEntriesIncluded.length , uid: param[1]}
                break;
            case apiField['designed_for']:
                initialDesignedFor += '&' + param[0] + '=' + param[1]
                initialSearchDesignedFor[initialSearchDesignedFor.length] = {name: "Country"+initialSearchDesignedFor.length , uid: param[1]}
                break;
            case apiField['subnational']:
                initialSubnational += '&' + param[0] + '=' + param[1]
                initialSearchSubnational[initialSearchSubnational.length] = {name: "Country"+initialSearchSubnational.length , uid: param[1]}
                break;
            case apiField['country']:
                initialCountry += '&' + param[0] + '=' + param[1]
                break;
            case apiField['name_abbrev']:
                initialNameAbbrev += '&' + param[0] + '=' + param[1]
                break;
            case apiField['concept_variables']:
                initialConceptVariables += '&' + param[0] + '=' + param[1]
                break;
            case apiField['modalities']:
                initialModalities += '&' + param[0] + '=' + param[1]
                break;
            case apiField['geographic_scope']:
                initialGeographicScope += '&' + param[0] + '=' + param[1]
                break;
            case apiField['conditions_of_access']:
                initialConditionsOfAccess += '&' + param[0] + '=' + param[1]
                break;
            case apiField['fulltext_available']:
                if(param[1] === 'true') {
                    initialFulltextAvailable += '&' + param[0] + '=' + param[1]
                    initialFulltextAvailableChk = param[1]
                }
                break;
            case apiField['meta_variables']:
                initialMetaVariables += '&' + param[0] + '=' + param[1]
                break;
            case apiField['text_units']:
                initialTextUnits += '&' + param[0] + '=' + param[1]
                break;
            case apiField['date_published']:
                initialDatePublished += '&' + param[0] + '=' + param[1]
                break;
            case apiField['date_founded']:
                initialDateFounded += '&' + param[0] + '=' + param[1]
                break;
            case apiField['party_affiliated']:
                initialPartyAffiliated += '&' + param[0] + '=' + param[1]
                break;
            case apiField['ownership_kind']:
                initialOwnershipKind += '&' + param[0] + '=' + param[1]
                break;
            case apiField['channels']:
                initialChannels += '&' + param[0] + '=' + param[1]
                break;
            case apiField['methodologies']:
                initialMethodologies += '&' + param[0] + '=' + param[1]
                break;
            case apiField['datasets_used']:
                initialDatasetsUsed += '&' + param[0] + '=' + param[1]
                break;
            case apiField['publication_kind']:
                initialPublicationKind += '&' + param[0] + '=' + param[1]
                break;
            case apiField['payment_model']:
                initialPaymentModel += '&' + param[0] + '=' + param[1]
                break;
            case apiField['reverse_sources_included']:
                initialReverseSourcesIncluded += '&' + param[0] + '=' + param[1]
                break;
            case apiField['verified_account']:
                if(param[1] === 'true') {
                    initialVerifiedAccount += '&' + param[0] + '=' + param[1]
                    initialVerifiedAccountChk = param[1]
                }
                break;
            case apiField['special_interest']:
                if(param[1] === 'true') {
                    initialSpecialInterest += '&' + param[0] + '=' + param[1]
                    initialSpecialInterestChk = param[1]
                }
                break;
            case apiField['transcript_kind']:
                initialTranscriptKind += '&' + param[0] + '=' + param[1]
                break;
            case apiField['website_allows_comments']:
                initialWebsiteAllowsComments += '&' + param[0] + '=' + param[1]
                break;
            case apiField['topical_focus']:
                initialTopicalFocus += '&' + param[0] + '=' + param[1]
                break;
            case apiField['publication_cycle']:
                initialPublicationCycle += '&' + param[0] + '=' + param[1]
                break;
            case apiField['contains_ads']:
                initialContainsAds += '&' + param[0] + '=' + param[1]
                break;
            case apiField['channel_epaper']:
                initialChannelEpaper += '&' + param[0] + '=' + param[1]
                break;
            case apiField['defunct']:
                if(param[1] === 'true') {
                    initialDefunct += '&' + param[0] + '=' + param[1]
                    initialDefunctChk = param[1]
                }
                break;
            case apiField['audience_size_unit']:
                initialAudienceSizeUnit += '&' + param[0] + '=' + param[1]
                break;
            case apiField['audience_size_count']:
                initialAudienceSizeCount += '&' + param[0] + '=' + param[1]
                break;
            case apiField['audience_size_recent_unit']:
                initialAudienceSizeRecentUnit += '&' + param[0] + '=' + param[1]
                break;
            case apiField['used_for']:
                initialUsedFor += '&' + param[0] + '=' + param[1]
                break;
            case apiField['programming_languages']:
                initialProgrammingLanguages += '&' + param[0] + '=' + param[1]
                break;
            case apiField['platforms']:
                initialPlatforms += '&' + param[0] + '=' + param[1]
                break;
            case apiField['open_source']:
                initialOpenSource += '&' + param[0] + '=' + param[1]
                break;
            case apiField['graphical_user_interface']:
                if(param[1] === 'true') {
                    initialGraphicalUserInterface += '&' + param[0] + '=' + param[1]
                    initialGraphicalUserInterfaceChk = param[1]
                }
                break;
            case apiField['language_independent']:
                if(param[1] === 'true') {
                    initialLanguageIndependent += '&' + param[0] + '=' + param[1]
                    initialLanguageIndependentChk = param[1]
                }
                break;
            case apiField['input_file_format']:
                initialInputFileFormat += '&' + param[0] + '=' + param[1]
                break;
            case apiField['output_file_format']:
                initialOutputFileFormat += '&' + param[0] + '=' + param[1]
                break;
            case apiField['author_validated']:
                initialAuthorValidated += '&' + param[0] + '=' + param[1]
                break;
            case apiField['validation_dataset']:
                initialValidationDataset += '&' + param[0] + '=' + param[1]
                break;

            // logic/operator
            case apiField['countries_logic']:
                initialCountriesLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['languages_logic']:
                initialLanguagesLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['texttypes_logic']:
                initialTexttypesLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['sources_included_logic']:
                initialSourcesIncludedLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['entries_included_logic']:
                initialEntriesIncludedLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['designed_for_logic']:
                initialDesignedForLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['subnational_logic']:
                initialSubnationalLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['subunits_logic']:
                initialSubunitsLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['concept_variables_logic']:
                initialConceptVariablesLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['modalities_logic']:
                initialModalitiesLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['geographic_scope_logic']:
                initialGeographicScopeLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['meta_variables_logic']:
                initialMetaVariablesLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['text_units_logic']:
                initialTextUnitsLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['date_published_operator']:
                initialDatePublishedOperator += '&' + param[0] + '=' + param[1]
                break;
            case apiField['channels_logic']:
                initialChannelsLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['methodologies_logic']:
                initialMethodologiesLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['publication_kind_logic']:
                initialPublicationKindLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['datasets_used_logic']:
                initialDatasetsUsedLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['reverse_sources_included_logic']:
                initialReverseSourcesIncludedLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['topical_focus_logic']:
                initialTopicalFocusLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['audience_size_count_operator']:
                initialAudienceSizeCountOperator += '&' + param[0] + '=' + param[1]
                break;
            case apiField['used_for_logic']:
                initialUsedForLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['programming_languages_logic']:
                initialProgrammingLanguagesLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['platforms_logic']:
                initialPlatformsLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['input_file_format_logic']:
                initialInputFileFormatLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['output_file_format_logic']:
                initialOutputFileFormatLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['validation_dataset_logic']:
                initialValidationDatasetLogic += '&' + param[0] + '=' + param[1]
                break;
            default:
                break;
        }
    }

    // state vars
    // 2a. predicate option lists
    const [entitiesList, setEntitiesList] = useState([])
    const [countriesList, setCountriesList] = useState([])
    const [channelList, setChannelList] = useState([])
    const [languagesList, setLanguagesList] = useState([])
    const [texttypesList, setTexttypesList] = useState([])
    const [subunitsList, setSubunitsList] = useState([])
    const [countryList, setCountryList] = useState([])
    const [conceptVariablesList, setConceptVariablesList] = useState([])
    const [modalitiesList, setModalitiesList] = useState([])
    const [geographicScopeList, setGeographicScopeList] = useState([])
    const [conditionsOfAccessList, setConditionsOfAccessList] = useState([])
    const [metaVariablesList, setMetaVariablesList] = useState([])
    const [textUnitsList, setTextUnitsList] = useState([])
    const [datePublishedOperatorList, setDatePublishedOperatorList] = useState([])
    const [partyAffiliatedList, setPartyAffiliatedList] = useState([])
    const [ownershipKindList, setOwnershipKindList] = useState([])
    const [channelsList, setChannelsList] = useState([])
    const [methodologiesList, setMethodologiesList] = useState([])
    const [datasetsUsedList, setDatasetsUsedList] = useState([])
    const [publicationKindList, setPublicationKindList] = useState([])
    const [paymentModelList, setPaymentModelList] = useState([])
    const [reverseSourcesIncludedList, setReverseSourcesIncludedList] = useState([])
    const [transcriptKindList, setTranscriptKindList] = useState([])
    const [websiteAllowsCommentsList, setWebsiteAllowsCommentsList] = useState([])
    const [topicalFocusList, setTopicalFocusList] = useState([])
    const [publicationCycleList, setPublicationCycleList] = useState([])
    const [containsAdsList, setContainsAdsList] = useState([])
    const [channelEpaperList, setChannelEpaperList] = useState([])
    const [audienceSizeUnitList, setAudienceSizeUnitList] = useState([])
    const [audienceSizeCountOperatorList, setAudienceSizeCountOperatorList] = useState([])
    const [audienceSizeRecentUnitList, setAudienceSizeRecentUnitList] = useState([])
    const [usedForList, setUsedForList] = useState([])
    const [programmingLanguagesList, setProgrammingLanguagesList] = useState([])
    const [platformsList, setPlatformsList] = useState([])
    const [openSourceList, setOpenSourceList] = useState([])
    const [inputFileFormatList, setInputFileFormatList] = useState([])
    const [outputFileFormatList, setOutputFileFormatList] = useState([])
    const [authorValidatedList, setAuthorValidatedList] = useState([])
    const [validationDatasetList, setValidationDatasetList] = useState([])

    // 2b. previous predicate search params
    const [searchCountries, setSearchCountries] = useState();
    const [searchEntities, setSearchEntities] = useState();
    const [searchChannel, setSearchChannel] = useState();
    const [searchLanguages, setSearchLanguages] = useState();
    const [searchTexttypes, setSearchTexttypes] = useState();
    const [searchSourcesIncluded, setSearchSourcesIncluded] = useState(initialSearchSourcesIncluded);
    const [searchEntriesIncluded, setSearchEntriesIncluded] = useState(initialSearchEntriesIncluded);
    const [searchDesignedFor, setSearchDesignedFor] = useState(initialSearchDesignedFor);
    const [searchSubnational, setSearchSubnational] = useState(initialSearchSubnational);
    const [searchSubunits, setSearchSubunits] = useState();
    const [searchCountry, setSearchCountry] = useState();
    const [searchConceptVariables, setSearchConceptVariables] = useState();
    const [searchModalities, setSearchModalities] = useState();
    const [searchGeographicScope, setSearchGeographicScope] = useState();
    const [searchConditionsOfAccess, setSearchConditionsOfAccess] = useState();
    const [searchMetaVariables, setSearchMetaVariables] = useState();
    const [searchTextUnits, setSearchTextUnits] = useState();
    const [searchDatePublishedOperator, setSearchDatePublishedOperator] = useState();
    const [searchPartyAffiliated, setSearchPartyAffiliated] = useState();
    const [searchOwnershipKind, setSearchOwnershipKind] = useState();
    const [searchChannels, setSearchChannels] = useState();
    const [searchMethodologies, setSearchMethodologies] = useState();
    const [searchDatasetsUsed, setSearchDatasetsUsed] = useState();
    const [searchPublicationKind, setSearchPublicationKind] = useState();
    const [searchPaymentModel, setSearchPaymentModel] = useState();
    const [searchReverseSourcesIncluded, setSearchReverseSourcesIncluded] = useState();
    const [searchTranscriptKind, setSearchTranscriptKind] = useState();
    const [searchWebsiteAllowsComments, setSearchWebsiteAllowsComments] = useState();
    const [searchTopicalFocus, setSearchTopicalFocus] = useState();
    const [searchPublicationCycle, setSearchPublicationCycle] = useState();
    const [searchContainsAds, setSearchContainsAds] = useState();
    const [searchChannelEpaper, setSearchChannelEpaper] = useState();
    const [searchAudienceSizeUnit, setSearchAudienceSizeUnit] = useState();
    const [searchAudienceSizeCountOperator, setSearchAudienceSizeCountOperator] = useState();
    const [searchAudienceSizeRecentUnit, setSearchAudienceSizeRecentUnit] = useState();
    const [searchUsedFor, setSearchUsedFor] = useState();
    const [searchProgrammingLanguages, setSearchProgrammingLanguages] = useState();
    const [searchPlatforms, setSearchPlatforms] = useState();
    const [searchOpenSource, setSearchOpenSource] = useState();
    const [searchInputFileFormat, setSearchInputFileFormat] = useState();
    const [searchOutputFileFormat, setSearchOutputFileFormat] = useState();
    const [searchAuthorValidated, setSearchAuthorValidated] = useState();
    const [searchValidationDataset, setSearchValidationDataset] = useState();

    // 2c. current predicate search choices
    const [countries, setCountries] = useState(initialCountries);
    const [entities, setEntities] = useState(initialEntities);
    const [freeText, setFreeText] = useState(initialText);
    const [channel, setChannel] = useState(initialChannel);
    const [languages, setLanguages] = useState(initialLanguages);
    const [texttypes, setTexttypes] = useState(initialTexttypes);
    const [sourcesIncluded, setSourcesIncluded] = useState(initialSourcesIncluded);
    const [entriesIncluded, setEntriesIncluded] = useState(initialEntriesIncluded);
    const [designedFor, setDesignedFor] = useState(initialDesignedFor);
    const [subnational, setSubnational] = useState(initialSubnational);
    const [subunits, setSubunits] = useState(initialSubunits);
    const [country, setCountry] = useState(initialCountry);
    const [nameAbbrev, setNameAbbrev] = useState(initialNameAbbrev);
    const [conceptVariables, setConceptVariables] = useState(initialConceptVariables);
    const [modalities, setModalities] = useState(initialModalities);
    const [geographicScope, setGeographicScope] = useState(initialGeographicScope);
    const [conditionsOfAccess, setConditionsOfAccess] = useState(initialConditionsOfAccess);
    const [fulltextAvailable, setFulltextAvailable] = useState(initialFulltextAvailable);
    const [metaVariables, setMetaVariables] = useState(initialMetaVariables);
    const [textUnits, setTextUnits] = useState(initialTextUnits);
    const [datePublished, setDatePublished] = useState(initialDatePublished);
    const [dateFounded, setDateFounded] = useState(initialDateFounded);
    const [partyAffiliated, setPartyAffiliated] = useState(initialPartyAffiliated);
    const [ownershipKind, setOwnershipKind] = useState(initialOwnershipKind);
    const [channels, setChannels] = useState(initialChannels);
    const [methodologies, setMethodologies] = useState(initialMethodologies);
    const [datasetsUsed, setDatasetsUsed] = useState(initialDatasetsUsed);
    const [publicationKind, setPublicationKind] = useState(initialPublicationKind);
    const [paymentModel, setPaymentModel] = useState(initialPaymentModel);
    const [reverseSourcesIncluded, setReverseSourcesIncluded] = useState(initialReverseSourcesIncluded);
    const [verifiedAccount, setVerifiedAccount] = useState(initialVerifiedAccount);
    const [transcriptKind, setTranscriptKind] = useState(initialTranscriptKind);
    const [websiteAllowsComments, setWebsiteAllowsComments] = useState(initialWebsiteAllowsComments);
    const [specialInterest, setSpecialInterest] = useState(initialSpecialInterest);
    const [topicalFocus, setTopicalFocus] = useState(initialTopicalFocus);
    const [publicationCycle, setPublicationCycle] = useState(initialPublicationCycle);
    const [containsAds, setContainsAds] = useState(initialContainsAds);
    const [channelEpaper, setChannelEpaper] = useState(initialChannelEpaper);
    const [defunct, setDefunct] = useState(initialDefunct);
    const [audienceSizeUnit, setAudienceSizeUnit] = useState(initialAudienceSizeUnit);
    const [audienceSizeCount, setAudienceSizeCount] = useState(initialAudienceSizeCount);
    const [audienceSizeRecentUnit, setAudienceSizeRecentUnit] = useState(initialAudienceSizeRecentUnit);
    const [usedFor, setUsedFor] = useState(initialUsedFor);
    const [programmingLanguages, setProgrammingLanguages] = useState(initialProgrammingLanguages);
    const [platforms, setPlatforms] = useState(initialPlatforms);
    const [openSource, setOpenSource] = useState(initialOpenSource);
    const [graphicalUserInterface, setGraphicalUserInterface] = useState(initialGraphicalUserInterface);
    const [languageIndependent, setLanguageIndependent] = useState(initialLanguageIndependent);
    const [inputFileFormat, setInputFileFormat] = useState(initialInputFileFormat);
    const [outputFileFormat, setOutputFileFormat] = useState(initialOutputFileFormat);
    const [authorValidated, setAuthorValidated] = useState(initialAuthorValidated);
    const [validationDataset, setValidationDataset] = useState(initialValidationDataset);

    // 2d. current logic choices
    const [countriesLogic, setCountriesLogic] = useState(initialCountriesLogic);
    const [languagesLogic, setLanguagesLogic] = useState(initialLanguagesLogic);
    const [texttypesLogic, setTexttypesLogic] = useState(initialTexttypesLogic);
    const [sourcesIncludedLogic, setSourcesIncludedLogic] = useState(initialSourcesIncludedLogic);
    const [entriesIncludedLogic, setEntriesIncludedLogic] = useState(initialEntriesIncludedLogic);
    const [designedForLogic, setDesignedForLogic] = useState(initialDesignedForLogic);
    const [subnationalLogic, setSubnationalLogic] = useState(initialSubnationalLogic);
    const [subunitsLogic, setSubunitsLogic] = useState(initialSubunitsLogic);
    const [conceptVariablesLogic, setConceptVariablesLogic] = useState(initialConceptVariablesLogic);
    const [modalitiesLogic, setModalitiesLogic] = useState(initialModalitiesLogic);
    const [geographicScopeLogic, setGeographicScopeLogic] = useState(initialGeographicScopeLogic);
    const [metaVariablesLogic, setMetaVariablesLogic] = useState(initialMetaVariablesLogic);
    const [textUnitsLogic, setTextUnitsLogic] = useState(initialTextUnitsLogic);
    const [datePublishedOperator, setDatePublishedOperator] = useState(initialDatePublishedOperator);
    const [channelsLogic, setChannelsLogic] = useState(initialChannelsLogic);
    const [methodologiesLogic, setMethodologiesLogic] = useState(initialMethodologiesLogic);
    const [datasetsUsedLogic, setDatasetsUsedLogic] = useState(initialDatasetsUsedLogic);
    const [publicationKindLogic, setPublicationKindLogic] = useState(initialPublicationKindLogic);
    const [reverseSourcesIncludedLogic, setReverseSourcesIncludedLogic] = useState(initialReverseSourcesIncludedLogic);
    const [topicalFocusLogic, setTopicalFocusLogic] = useState(initialTopicalFocusLogic);
    const [audienceSizeCountOperator, setAudienceSizeCountOperator] = useState(initialAudienceSizeCountOperator);
    const [usedForLogic, setUsedForLogic] = useState(initialUsedForLogic);
    const [programmingLanguagesLogic, setProgrammingLanguagesLogic] = useState(initialProgrammingLanguagesLogic);
    const [platformsLogic, setPlatformsLogic] = useState(initialPlatformsLogic);
    const [inputFileFormatLogic, setInputFileFormatLogic] = useState(initialInputFileFormatLogic);
    const [outputFileFormatLogic, setOutputFileFormatLogic] = useState(initialOutputFileFormatLogic);
    const [validationDatasetLogic, setValidationDatasetLogic] = useState(initialValidationDatasetLogic);

    // 2e. Extra data
    const [sourcesIncludedDetails, setSourcesIncludedDetails] = useState([])
    const [sourcesIncludedDetailsLoaded, setSourcesIncludedDetailsLoaded] = useState(false)
    const [entriesIncludedDetails, setEntriesIncludedDetails] = useState([])
    const [entriesIncludedDetailsLoaded, setEntriesIncludedDetailsLoaded] = useState(false)
    const [designedForDetails, setDesignedForDetails] = useState([])
    const [designedForDetailsLoaded, setDesignedForDetailsLoaded] = useState(false)
    const [subnationalDetails, setSubnationalDetails] = useState([])
    const [subnationalDetailsLoaded, setSubnationalDetailsLoaded] = useState(false)

    // fetch all data needed for this page from API
    const fetchItemData = () => {

        // 3a. add each predicate here (not async)

        // types
        fetchData('schema/types', 'entity', 0, true)

        // countries
        fetchData('schema/predicate/counts/', 'countries', 1, true)

        // channel
        fetchData('schema/predicate/counts/', 'channel', 1, true)

        // languages
        fetchData('schema/predicate/counts/', 'languages', 1, true)

        // texttypes
        fetchData('schema/predicate/counts/', 'text_types', 1, true)

        // subunits
        fetchData('query?_max_results=50&_page=1&dgraph.type=Subnational&countries=0x15&countries=0x1b&countries%2Aconnector=OR', 'subunits', 1, true)

        // get extra data for 'Sources Included'
        fetchAsyncDetails('sources_included', initialSearchSourcesIncluded)

        // get extra data for 'entries_included'
        fetchAsyncDetails('entries_included', initialSearchEntriesIncluded)

        // get extra data for 'designed_for'
        fetchAsyncDetails('designed_for', initialSearchDesignedFor)

        // get extra data for 'subnational'
        fetchAsyncDetails('subnational', initialSearchSubnational)

        // country
        fetchData('schema/predicate/counts/', 'country', 1, true)

        // concept_variables
        fetchData('schema/predicate/counts/', 'concept_variables', 1, true)

        // modalities
        fetchData('schema/predicate/counts/', 'modalities', 1, true)

        // geographic_scope
        fetchData('schema/predicate/', 'geographic_scope', 1, false)

        // conditions_of_access
        fetchData('schema/predicate/', 'conditions_of_access', 1, false)

        // meta_variables
        fetchData('schema/predicate/counts/', 'meta_variables', 1, true)

        // text_units
        fetchData('schema/predicate/counts/', 'text_units', 1, true)

        setFixedSelect('date_published_operator')
        setFixedSelect('audience_size_unit')
        setFixedSelect('audience_size_count_operator')
        setFixedSelect('audience_size_recent_unit')

        setFixedSelect('website_allows_comments')

        // channels
        fetchData('schema/predicate/counts/', 'channels', 1, true)

        // methodologies
        fetchData('schema/predicate/counts/', 'methodologies', 1, true)

        // datasets_used
        fetchData('schema/predicate/counts/', 'datasets_used', 1, true)

        // publication_kind
        fetchData('schema/predicate/counts/', 'publication_kind', 2, true)

        // reverse_sources_included
        fetchData('query?dgraph.type=Archive', 'reverse_sources_included', 1, true)

        // topical_focus
        fetchData('schema/predicate/counts/', 'topical_focus', 2, true)

        // publication_cycle
        fetchData('schema/predicate/counts/', 'publication_cycle', 2, true)

        // contains_ads
        fetchData('schema/predicate/counts/', 'contains_ads', 2, true)

        // channel_epaper
        fetchData('schema/predicate/', 'channel_epaper', 1, false)

        // party_affiliated
        fetchData('schema/predicate/', 'party_affiliated', 1, false)

        // ownership_kind
        fetchData('schema/predicate/', 'ownership_kind', 1, false)

        // payment_model
        fetchData('schema/predicate/', 'payment_model', 1, false)

        // transcript_kind
        fetchData('schema/predicate/', 'transcript_kind', 1, false)

        // website_allows_comments
        fetchData('schema/predicate/', 'website_allows_comments', 1, false)

        // used_for
        fetchData('schema/predicate/counts/', 'used_for', 1, true)

        // programming_languages
        fetchData('schema/predicate/counts/', 'programming_languages', 1, true)

        // platforms
        fetchData('schema/predicate/counts/', 'platforms', 2, true)

        // open_source
        fetchData('schema/predicate/', 'open_source', 2, false)

        // input_file_format
        fetchData('schema/predicate/', 'input_file_format', 1, true, true)

        // output_file_format
        fetchData('schema/predicate/', 'output_file_format', 1, true, true)

        // author_validated
        fetchData('schema/predicate/', 'author_validated', 2, false)

        // validation_dataset
        fetchData('schema/predicate/', 'validation_dataset', 1, true, true)
    }

    const setFixedSelect = (predicate) => {
        let s = []
        let data = []
        switch (predicate) {
            case 'date_published_operator':
                data[data.length] = {uid: 'ge', name: 'after'}
                data[data.length] = {uid: 'le', name: 'before'}
                data[data.length] = {uid: 'eq', name: 'exact'}
                break
            case 'audience_size_unit':
                data[data.length] = {uid: 'followers', name: 'Followers'}
                data[data.length] = {uid: 'subscribers', name: 'Subscribers'}
                data[data.length] = {uid: 'copies sold', name: 'Copies Sold'}
                data[data.length] = {uid: 'likes', name: 'Likes'}
                data[data.length] = {uid: 'daily visitors', name: 'Daily Visitors'}
                break
            case 'audience_size_count_operator':
                data[data.length] = {uid: 'gt', name: 'greater'}
                data[data.length] = {uid: 'lt', name: 'less'}
                break
            case 'audience_size_recent_unit':
                data[data.length] = {uid: 'followers', name: 'Followers'}
                data[data.length] = {uid: 'subscribers', name: 'Subscribers'}
                data[data.length] = {uid: 'copies sold', name: 'Copies Sold'}
                data[data.length] = {uid: 'likes', name: 'Likes'}
                data[data.length] = {uid: 'daily visitors', name: 'Daily Visitors'}
                break
            default:
                break;
        }

        for (var d of data)
        {
            for (let param of searchParams) {
                if (param[0] === apiField[predicate] && param[1] === d.uid) {
                    s[s.length] = {value: d.uid, label: d.name};
                }
            }
        }

        switch (predicate) {
            case 'date_published_operator':
                setDatePublishedOperatorList(data);
                setSearchDatePublishedOperator(s);
                break;
            case 'audience_size_unit':
                setAudienceSizeUnitList(data);
                setSearchAudienceSizeUnit(s);
                break;
            case 'audience_size_count_operator':
                setAudienceSizeCountOperatorList(data);
                setSearchAudienceSizeCountOperator(s);
                break;
            case 'audience_size_recent_unit':
                setAudienceSizeRecentUnitList(data);
                setSearchAudienceSizeRecentUnit(s);
                break;

            case 'website_allows_comments':
                setWebsiteAllowsCommentsList(data);
                setSearchWebsiteAllowsComments(s);
                break;
            default:
                break;
        }
    }

    // function to get details of initial selections from async select boxes
    const fetchAsyncDetails = (predicate, uids) => {
        const p = [];
        uids.forEach(b => {
            p.push(
                fetch(process.env.REACT_APP_API + "view/uid/" + b.uid)
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        return data;
                    })
            )
        });
        Promise.all(p)
            .then((d) => {
                switch (predicate){
                    // 3b. Add for each Async predicate
                    case 'sources_included':
                        setSourcesIncludedDetails(prevDetails => [...prevDetails, ...d])
                        setSourcesIncludedDetailsLoaded(true)
                        break
                    case 'entries_included':
                        setEntriesIncludedDetails(prevDetails => [...prevDetails, ...d])
                        setEntriesIncludedDetailsLoaded(true)
                        break
                    case 'designed_for':
                        setDesignedForDetails(prevDetails => [...prevDetails, ...d])
                        setDesignedForDetailsLoaded(true)
                        break
                    case 'subnational':
                        setSubnationalDetails(prevDetails => [...prevDetails, ...d])
                        setSubnationalDetailsLoaded(true)
                        break
                    default:
                        break
                }
            });
    }

    // helper fetch function
    const fetchData = (fetchURL, predicate, val, list, detailed=false) => {
        /*
            Arguments:
                fetchURL:
                    URL of the API query (minus the basePath)
                predicate
                    If the fetchURL contains a '/' then the predicate is added to the fetchURL
                val:
                    0 = uses 'name' field from returned API query for both value & name parameters
                    1 = uses 'uid' and 'name
                    2 = user 'value' and 'name;
                list:
                    true = API query returns a list of dictionaries
                    false = single dictionary returned
                detailed:
                    true: add '?detailed=true' to the API query. This returns a list of dictionaries instead of a list of key/value pairs
        */
        // construct API URL
        let fullURL = process.env.REACT_APP_API
        fullURL += fetchURL
        if (fullURL.slice(-1) === '/'){
            fullURL += predicate
        }
        if (detailed){
            fullURL += '?detailed=true'
        }
        //console.log(fullURL)

        // fetch data
        fetch(fullURL)
            .then(response => {
                return response.json()
            })
            .then(data => {
                // get list of previously selected search items
                let s = []
                if(list) {
                    for (var d of data) {
                        for (let param of searchParams) {
                            if (val === 1) {
                                if (param[0] === apiField[predicate] && param[1] === d.uid) {
                                    s[s.length] = {value: d.uid, label: d.name};
                                }
                            } else {
                                if (val === 0){
                                    if (param[0] === apiField[predicate] && param[1] === d.name) {
                                        s[s.length] = {value: d.name, label: d.name};
                                    }
                                } else {
                                    if (param[0] === apiField[predicate] && param[1] === d.value) {
                                        s[s.length] = {value: d.value, label: d.name};
                                    }
                                }
                            }
                        }
                    }
                } else {
                    for (const [key, val] of Object.entries(data)) {
                        for (let param of searchParams) {
                            if (param[0] === apiField[predicate] && param[1] === key) {
                                s[s.length] = {value: key, label: val};
                            }
                        }
                    }
                }
                setStateVars(predicate, data, s)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // set state vars after fetch
    const setStateVars = (predicate, data, s) => {
        // 4. add each predicate here (not async)
        switch (predicate){
            case 'countries':
                setCountriesList(data);
                setSearchCountries(s);
                break;
            case 'entity':
                setEntitiesList(data);
                setSearchEntities(s);
                break;
            case 'channel':
                setChannelList(data);
                setSearchChannel(s);
                break;
            case 'languages':
                setLanguagesList(data);
                setSearchLanguages(s);
                break;
            case 'text_types':
                setTexttypesList(data);
                setSearchTexttypes(s);
                break;
            case 'subunits':
                setSubunitsList(data);
                setSearchSubunits(s);
                break;
            case 'country':
                setCountryList(data);
                setSearchCountry(s);
                break;
            case 'concept_variables':
                setConceptVariablesList(data);
                setSearchConceptVariables(s);
                break;
            case 'modalities':
                setModalitiesList(data);
                setSearchModalities(s);
                break;
            case 'geographic_scope':
                setGeographicScopeList(data);
                setSearchGeographicScope(s);
                break;
            case 'conditions_of_access':
                setConditionsOfAccessList(data);
                setSearchConditionsOfAccess(s);
                break;
            case 'meta_variables':
                setMetaVariablesList(data);
                setSearchMetaVariables(s);
                break;
            case 'text_units':
                setTextUnitsList(data);
                setSearchTextUnits(s);
                break;
            case 'channels':
                setChannelsList(data);
                setSearchChannels(s);
                break;
            case 'methodologies':
                setMethodologiesList(data);
                setSearchMethodologies(s);
                break;
            case 'datasets_used':
                setDatasetsUsedList(data);
                setSearchDatasetsUsed(s);
                break;
            case 'publication_kind':
                setPublicationKindList(data);
                setSearchPublicationKind(s);
                break;
            case 'reverse_sources_included':
                setReverseSourcesIncludedList(data);
                setSearchReverseSourcesIncluded(s);
                break;
            case 'topical_focus':
                setTopicalFocusList(data);
                setSearchTopicalFocus(s);
                break;
            case 'publication_cycle':
                setPublicationCycleList(data);
                setSearchPublicationCycle(s);
                break;
            case 'contains_ads':
                setContainsAdsList(data);
                setSearchContainsAds(s);
                break;
            case 'channel_epaper':
                setChannelEpaperList(data);
                setSearchChannelEpaper(s);
                break;
            case 'party_affiliated':
                setPartyAffiliatedList(data);
                setSearchPartyAffiliated(s);
                break;
            case 'ownership_kind':
                setOwnershipKindList(data);
                setSearchOwnershipKind(s);
                break;
            case 'payment_model':
                setPaymentModelList(data);
                setSearchPaymentModel(s);
                break;
            case 'transcript_kind':
                setTranscriptKindList(data);
                setSearchTranscriptKind(s);
                break;
            case 'website_allows_comments':
                setWebsiteAllowsCommentsList(data);
                setSearchWebsiteAllowsComments(s);
                break;
            case 'used_for':
                setUsedForList(data);
                setSearchUsedFor(s);
                break;
            case 'programming_languages':
                setProgrammingLanguagesList(data);
                setSearchProgrammingLanguages(s);
                break;
            case 'platforms':
                setPlatformsList(data);
                setSearchPlatforms(s);
                break;
            case 'open_source':
                setOpenSourceList(data);
                setSearchOpenSource(s);
                break;
            case 'input_file_format':
                setInputFileFormatList(data);
                setSearchInputFileFormat(s);
                break;
            case 'output_file_format':
                setOutputFileFormatList(data);
                setSearchOutputFileFormat(s);
                break;
            case 'author_validated':
                setAuthorValidatedList(data);
                setSearchAuthorValidated(s);
                break;
            case 'validation_dataset':
                setValidationDatasetList(data);
                setSearchValidationDataset(s);
                break;
            default:
                break;
        }
    }

    // run after each re-render
    useEffect(() => {
        fetchItemData()

        // add listener for pressing 'Enter' button
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                let my_button = document.getElementById("submitForm")
                my_button.click()
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };


    }, [])

    // create querystring for search
    const handleSubmitAS = (event) => {
        event.preventDefault();
        //create querystring
        let qs = ''

        // 5. add each search term here
        //predicates
        qs += entities
        qs += countries
        qs += freeText
        qs += channel
        qs += languages
        qs += texttypes
        if(checkDisplay(show_sources_included, entities)) {qs += sourcesIncluded}
        if(checkDisplay(show_entries_included, entities)) {qs += entriesIncluded}
        if(checkDisplay(show_designed_for, entities)) {qs += designedFor}
        if(checkDisplay(show_subnational, entities)) {qs += subnational}
        if(checkDisplay(show_subunits, entities)){qs += subunits}
        if(checkDisplay(show_country, entities)) {qs += country}
        if (checkDisplay(show_name_abbrev, entities)){qs += nameAbbrev}
        if (checkDisplay(show_concept_variables, entities)) {qs += conceptVariables}
        if(checkDisplay(show_modalities, entities)){qs += modalities}
        if(checkDisplay(show_geographic_scope, entities)){qs += geographicScope}
        if(checkDisplay(show_conditions_of_access, entities)){qs += conditionsOfAccess}
        if(checkDisplay(show_fulltext_available, entities)){qs += fulltextAvailable}
        if(checkDisplay(show_meta_variables, entities)){qs += metaVariables}
        if(checkDisplay(show_text_units, entities)){qs += textUnits}
        if(checkDisplay(show_date_published, entities)){qs += datePublished}
        if(checkDisplay(show_date_founded, entities)){qs += dateFounded}
        if(checkDisplay(show_party_affiliated, entities)){qs += partyAffiliated}
        if(checkDisplay(show_ownership_kind, entities)){qs += ownershipKind}
        if(checkDisplay(show_channels, entities)){qs += channels}
        if(checkDisplay(show_methodologies, entities)){qs += methodologies}
        if(checkDisplay(show_datasets_used, entities)){qs += datasetsUsed}
        if(checkDisplay(show_publication_kind, entities)){qs += publicationKind}
        if(checkDisplay(show_payment_model, entities)){qs += paymentModel}
        if(checkDisplay(show_reverse_sources_included, entities)){qs += reverseSourcesIncluded}
        if(checkDisplay(show_verified_account, entities)){qs += verifiedAccount}
        if(checkDisplay(show_transcript_kind, entities)){qs += transcriptKind}
        if(checkDisplay(show_website_allows_comments, entities)){qs += websiteAllowsComments}
        if(checkDisplay(show_special_interest, entities)){qs += specialInterest}
        if(checkDisplay(show_topical_focus, entities)){qs += topicalFocus}
        if(checkDisplay(show_publication_cycle, entities)){qs += publicationCycle}
        if(checkDisplay(show_contains_ads, entities)){qs += containsAds}
        if(checkDisplay(show_channel_epaper, entities)){qs += channelEpaper}
        if(checkDisplay(show_defunct, entities)){qs += defunct}
        if(checkDisplay(show_audience_size_unit, entities)){qs += audienceSizeUnit}
        if(checkDisplay(show_audience_size_count, entities)){qs += audienceSizeCount}
        if(checkDisplay(show_audience_size_recent_unit, entities)){qs += audienceSizeRecentUnit}
        if(checkDisplay(show_used_for, entities)){qs += usedFor}
        if(checkDisplay(show_programming_languages, entities)){qs += programmingLanguages}
        if(checkDisplay(show_platforms, entities)){qs += platforms}
        if(checkDisplay(show_open_source, entities)){qs += openSource}
        if(checkDisplay(show_graphical_user_interface, entities)){qs += graphicalUserInterface}
        if(checkDisplay(show_language_independent, entities)){qs += languageIndependent}
        if(checkDisplay(show_input_file_format, entities)){qs += inputFileFormat}
        if(checkDisplay(show_output_file_format, entities)){qs += outputFileFormat}
        if(checkDisplay(show_author_validated, entities)){qs += authorValidated}
        if(checkDisplay(show_validation_dataset, entities)){qs += validationDataset}

        //logic
        if(countries) {qs += countriesLogic}
        if(languages) {qs += languagesLogic}
        if(texttypes) {qs += texttypesLogic}
        if(sourcesIncluded) {qs += sourcesIncludedLogic}
        if(entriesIncluded) {qs += entriesIncludedLogic}
        if(designedFor) {qs += designedForLogic}
        if(subnational) {qs += subnationalLogic}
        if(subunits) {qs += subunitsLogic}
        if(conceptVariables) {qs += conceptVariablesLogic}
        if(modalities) {qs += modalitiesLogic}
        if(geographicScope) {qs += geographicScopeLogic}
        if(metaVariables) {qs += metaVariablesLogic}
        if(textUnits) {qs += textUnitsLogic}
        if(datePublished) {qs += datePublishedOperator}
        if(channels) {qs += channelsLogic}
        if(methodologies) {qs += methodologiesLogic}
        if(datasetsUsed) {qs += datasetsUsedLogic}
        if(publicationKind) {qs += publicationKindLogic}
        if(reverseSourcesIncluded) {qs += reverseSourcesIncludedLogic}
        if(topicalFocus) {qs += topicalFocusLogic}
        if(audienceSizeCount) {qs += audienceSizeCountOperator}
        if(usedFor) {qs += usedForLogic}
        if(programmingLanguages) {qs += programmingLanguagesLogic}
        if(platforms) {qs += platformsLogic}
        if(inputFileFormat) {qs += inputFileFormatLogic}
        if(outputFileFormat) {qs += outputFileFormatLogic}
        if(validationDataset) {qs += validationDatasetLogic}

        // remove first &
        qs = qs.slice(1)

        navigate('/search/link?' + qs)
    }

    // select box handle - 6. need one for each predicate
    const handleChangeCountries = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'countries')
        setCountries(sel[0]);
        setSearchCountries(sel[1])
    };
    const handleChangeEntity = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'entity')
        setEntities(sel[0]);
        setSearchEntities(sel[1])

        // check if need to empty any search strings due to select boxes being hidden
        // 7. need one for each 'extra' predicate
        if (!checkDisplay(show_sources_included, sel[0])){
            setSearchSourcesIncluded('')
            setSourcesIncluded('')
        }
        if (!checkDisplay(show_entries_included, sel[0])){
            setSearchEntriesIncluded('')
            setEntriesIncluded('')
        }
        if (!checkDisplay(show_designed_for, sel[0])){
            setSearchDesignedFor('')
            setDesignedFor('')
        }
        if (!checkDisplay(show_subnational, sel[0])){
            setSearchSubnational('')
            setSubnational('')
        }
        if (!checkDisplay(show_subunits, sel[0])){
            setSearchSubunits('')
            setSubunits('')
        }
        if (!checkDisplay(show_name_abbrev, sel[0])){
            setNameAbbrev('')
        }
        if (!checkDisplay(show_country, sel[0])){
            setSearchCountry('')
            setCountry('')
        }
        if (!checkDisplay(show_concept_variables, sel[0])){
            setSearchConceptVariables('')
            setConceptVariables('')
        }
        if (!checkDisplay(show_modalities, sel[0])){
            setSearchModalities('')
            setModalities('')
        }
        if (!checkDisplay(show_geographic_scope, sel[0])){
            setSearchGeographicScope('')
            setGeographicScope('')
        }
        if (!checkDisplay(show_conditions_of_access, sel[0])){
            setSearchConditionsOfAccess('')
            setConditionsOfAccess('')
        }
        if (!checkDisplay(show_meta_variables, sel[0])){
            setSearchMetaVariables('')
            setMetaVariables('')
        }
        if (!checkDisplay(show_text_units, sel[0])){
            setSearchTextUnits('')
            setTextUnits('')
        }
        if (!checkDisplay(show_date_published, sel[0])){
            setDatePublished('')
        }
        if (!checkDisplay(show_date_founded, sel[0])){
            setDateFounded('')
        }
        if (!checkDisplay(show_channels, sel[0])){
            setSearchChannels('')
            setChannels('')
        }
        if (!checkDisplay(show_methodologies, sel[0])){
            setSearchMethodologies('')
            setMethodologies('')
        }
        if (!checkDisplay(show_datasets_used, sel[0])){
            setSearchDatasetsUsed('')
            setDatasetsUsed('')
        }
        if (!checkDisplay(show_publication_kind, sel[0])){
            setSearchPublicationKind('')
            setPublicationKind('')
        }
        if (!checkDisplay(show_reverse_sources_included, sel[0])){
            setSearchReverseSourcesIncluded('')
            setReverseSourcesIncluded('')
        }
        if (!checkDisplay(show_topical_focus, sel[0])){
            setSearchTopicalFocus('')
            setTopicalFocus('')
        }
        if (!checkDisplay(show_publication_cycle, sel[0])){
            setSearchPublicationCycle('')
            setPublicationCycle('')
        }
        if (!checkDisplay(show_channel_epaper, sel[0])){
            setSearchChannelEpaper('')
            setChannelEpaper('')
        }
        if (!checkDisplay(show_audience_size_count, sel[0])){
            setAudienceSizeCount('')
        }
        if (!checkDisplay(show_used_for, sel[0])){
            setSearchUsedFor('')
            setUsedFor('')
        }
        if (!checkDisplay(show_programming_languages, sel[0])){
            setSearchProgrammingLanguages('')
            setProgrammingLanguages('')
        }
        if (!checkDisplay(show_platforms, sel[0])){
            setSearchPlatforms('')
            setPlatforms('')
        }
        if (!checkDisplay(show_input_file_format, sel[0])){
            setSearchInputFileFormat('')
            setInputFileFormat('')
        }
        if (!checkDisplay(show_output_file_format, sel[0])){
            setSearchOutputFileFormat('')
            setOutputFileFormat('')
        }
        if (!checkDisplay(show_validation_dataset, sel[0])){
            setSearchValidationDataset('')
            setValidationDataset('')
        }

        if (!checkDisplay(show_party_affiliated, sel[0])){
            setSearchPartyAffiliated('')
            setPartyAffiliated('')
        }
        if (!checkDisplay(show_audience_size_unit, sel[0])){
            setSearchAudienceSizeUnit('')
            setAudienceSizeUnit('')
        }
        if (!checkDisplay(show_audience_size_recent_unit, sel[0])){
            setSearchAudienceSizeRecentUnit('')
            setAudienceSizeRecentUnit('')
        }
        if (!checkDisplay(show_ownership_kind, sel[0])){
            setSearchOwnershipKind('')
            setOwnershipKind('')
        }
        if (!checkDisplay(show_payment_model, sel[0])){
            setSearchPaymentModel('')
            setPaymentModel('')
        }
        if (!checkDisplay(show_transcript_kind, sel[0])){
            setSearchTranscriptKind('')
            setTranscriptKind('')
        }
        if (!checkDisplay(show_website_allows_comments, sel[0])){
            setSearchWebsiteAllowsComments('')
            setWebsiteAllowsComments('')
        }
    };
    const handleChangeChannel = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'channel')
        setChannel(sel[0]);
        setSearchChannel(sel[1])
    };
    const handleChangeLanguages = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'languages')
        setLanguages(sel[0]);
        setSearchLanguages(sel[1])
    };
    const handleChangeTexttypes = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'text_types')
        setTexttypes(sel[0]);
        setSearchTexttypes(sel[1])
    };
    const handleChangeSourcesIncluded = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption, 'sources_included')
        setSourcesIncluded(sel[0]);
        setSearchSourcesIncluded(sel[1])
    };
    const handleChangeEntriesIncluded = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption, 'entries_included')
        setEntriesIncluded(sel[0]);
        setSearchEntriesIncluded(sel[1])
    };
    const handleChangeDesignedFor = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption, 'designed_for')
        setDesignedFor(sel[0]);
        setSearchDesignedFor(sel[1])
    };
    const handleChangeSubnational = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption, 'subnational')
        setSubnational(sel[0]);
        setSearchSubnational(sel[1])
    };
    const handleChangeSubunits = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'subunits')
        setSubunits(sel[0]);
        setSearchSubunits(sel[1])
    };
    const handleChangeCountry = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'country')
        setCountry(sel[0]);
        setSearchCountry(sel[1])
    };
    const handleChangeConceptVariables = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'concept_variables')
        setConceptVariables(sel[0]);
        setSearchConceptVariables(sel[1])
    };
    const handleChangeModalities = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'modalities')
        setModalities(sel[0]);
        setSearchModalities(sel[1])
    };
    const handleChangeGeographicScope = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'geographic_scope')
        setGeographicScope(sel[0]);
        setSearchGeographicScope(sel[1])
    };
    const handleChangeConditionsOfAccess = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'conditions_of_access')
        setConditionsOfAccess(sel[0]);
        setSearchConditionsOfAccess(sel[1])
    };
    const handleChangeMetaVariables = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'meta_variables')
        setMetaVariables(sel[0]);
        setSearchMetaVariables(sel[1])
    };
    const handleChangeTextUnits = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'text_units')
        setTextUnits(sel[0]);
        setSearchTextUnits(sel[1])
    };
    const handleChangeDatePublishedOperator = (selectedOption) => {
        let sel = getSelectedOptions2(selectedOption, 'date_published_operator')
        setDatePublishedOperator(sel[0]);
        setSearchDatePublishedOperator(sel[1])
    };
    const handleChangePartyAffiliated = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'party_affiliated')
        setPartyAffiliated(sel[0]);
        setSearchPartyAffiliated(sel[1])
    };
    const handleChangeOwnershipKind = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'ownership_kind')
        setOwnershipKind(sel[0]);
        setSearchOwnershipKind(sel[1])
    };
    const handleChangeChannels = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'channels')
        setChannels(sel[0]);
        setSearchChannels(sel[1])
    };
    const handleChangeMethodologies = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'methodologies')
        setMethodologies(sel[0]);
        setSearchMethodologies(sel[1])
    };
    const handleChangeDatasetsUsed = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'datasets_used')
        setDatasetsUsed(sel[0]);
        setSearchDatasetsUsed(sel[1])
    };
    const handleChangePublicationKind = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'publication_kind')
        setPublicationKind(sel[0]);
        setSearchPublicationKind(sel[1])
    };
    const handleChangePaymentModel = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'payment_model')
        setPaymentModel(sel[0]);
        setSearchPaymentModel(sel[1])
    };
    const handleChangeReverseSourcesIncluded = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'reverse_sources_included')
        setReverseSourcesIncluded(sel[0]);
        setSearchReverseSourcesIncluded(sel[1])
    };
    const handleChangeTranscriptKind = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'transcript_kind')
        setTranscriptKind(sel[0]);
        setSearchTranscriptKind(sel[1])
    };
    const handleChangeWebsiteAllowsComments = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'website_allows_comments')
        setWebsiteAllowsComments(sel[0]);
        setSearchWebsiteAllowsComments(sel[1])
    };
    const handleChangeTopicalFocus = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'topical_focus')
        setTopicalFocus(sel[0]);
        setSearchTopicalFocus(sel[1])
    };
    const handleChangePublicationCycle = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'publication_cycle')
        setPublicationCycle(sel[0]);
        setSearchPublicationCycle(sel[1])
    };
    const handleChangeContainsAds = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'contains_ads')
        setContainsAds(sel[0]);
        setSearchContainsAds(sel[1])
    };
    const handleChangeChannelEpaper = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'channel_epaper')
        setChannelEpaper(sel[0]);
        setSearchChannelEpaper(sel[1])
    };
    const handleChangeAudienceSizeUnit = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'audience_size_unit')
        setAudienceSizeUnit(sel[0]);
        setSearchAudienceSizeUnit(sel[1])
    };
    const handleChangeAudienceSizeCountOperator = (selectedOption) => {
        let sel = getSelectedOptions2(selectedOption, 'audience_size_count_operator')
        setAudienceSizeCountOperator(sel[0]);
        setSearchAudienceSizeCountOperator(sel[1])
    };
    const handleChangeAudienceSizeRecentUnit = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'audience_size_recent_unit')
        setAudienceSizeRecentUnit(sel[0]);
        setSearchAudienceSizeRecentUnit(sel[1])
    };
    const handleChangeUsedFor = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'used_for')
        setUsedFor(sel[0]);
        setSearchUsedFor(sel[1])
    };
    const handleChangeProgrammingLanguages = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'programming_languages')
        setProgrammingLanguages(sel[0]);
        setSearchProgrammingLanguages(sel[1])
    };
    const handleChangePlatforms = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'platforms')
        setPlatforms(sel[0]);
        setSearchPlatforms(sel[1])
    };
    const handleChangeOpenSource = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'open_source')
        setOpenSource(sel[0]);
        setSearchOpenSource(sel[1])
    };
    const handleChangeInputFileFormat = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'input_file_format')
        setInputFileFormat(sel[0]);
        setSearchInputFileFormat(sel[1])
    };
    const handleChangeOutputFileFormat = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'output_file_format')
        setOutputFileFormat(sel[0]);
        setSearchOutputFileFormat(sel[1])
    };
    const handleChangeAuthorValidated = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'author_validated')
        setAuthorValidated(sel[0]);
        setSearchAuthorValidated(sel[1])
    };
    const handleChangeValidationDataset = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'validation_dataset')
        setValidationDataset(sel[0]);
        setSearchValidationDataset(sel[1])
    };
    // end

    // helper function for selectedOptions
    const getSelectedOptions = (selectedOption, predicate) => {
        var str = ""
        var sel = []
        for (var e in selectedOption){
            str += "&" + apiField[predicate] + "=" + selectedOption[e].value
            sel[sel.length] = selectedOption[e]
        }
        return [str, sel]
    };

    // helper function for selectedOptions
    const getSelectedOptions2 = (selectedOption, predicate) => {
        var str = ""
        var sel = []
        let sel_options = [selectedOption]
        for (var e in sel_options){
            str += "&" + apiField[predicate] + "=" + sel_options[e].value
            sel[sel.length] = sel_options[e]
        }
        return [str, sel]
    };

    // helper function for Async selectedOptions
    const getSelectedOptionsAsync = (selectedOption, predicate) => {
        var str = ""
        var sel = []
        for (var e in selectedOption){
            str += "&" + apiField[predicate] + "=" + selectedOption[e].uid
            sel[sel.length] = selectedOption[e]
            //sel[sel.length] = {value: selectedOption[e].uid, label: selectedOption[e].name}
        }
        return [str, sel]
    };

    // generic code to handle change in logic operator
    const handleChangeLogic = (event) => {
        let q = ''
        q = '&' + apiField[event.target.name] + '=' + event.target.value
        // 8. add each logic field here
        switch (event.target.name){
            case 'countries_logic':
                setCountriesLogic(q)
                break;
            case 'languages_logic':
                setLanguagesLogic(q)
                break;
            case 'texttypes_logic':
                setTexttypesLogic(q)
                break;
            case 'sources_included_logic':
                setSourcesIncludedLogic(q)
                break;
            case 'entries_included_logic':
                setEntriesIncludedLogic(q)
                break;
            case 'designed_for_logic':
                setDesignedForLogic(q)
                break;
            case 'subnational_logic':
                setSubnationalLogic(q)
                break;
            case 'subunits_logic':
                setSubunitsLogic(q)
                break;
            case 'concept_variables_logic':
                setConceptVariablesLogic(q)
                break;
            case 'modalities_logic':
                setModalitiesLogic(q)
                break;
            case 'geographic_scope_logic':
                setGeographicScopeLogic(q)
                break;
            case 'meta_variables_logic':
                setMetaVariablesLogic(q)
                break;
            case 'text_units_logic':
                setTextUnitsLogic(q)
                break;
            case 'channels_logic':
                setChannelsLogic(q)
                break;
            case 'methodologies_logic':
                setMethodologiesLogic(q)
                break;
            case 'datasets_used_logic':
                setDatasetsUsedLogic(q)
                break;
            case 'publication_kind_logic':
                setPublicationKindLogic(q)
                break;
            case 'reverse_sources_included_logic':
                setReverseSourcesIncludedLogic(q)
                break;
            case 'topical_focus_logic':
                setTopicalFocusLogic(q)
                break;
            case 'used_for_logic':
                setUsedForLogic(q)
                break;
            case 'programming_languages_logic':
                setProgrammingLanguagesLogic(q)
                break;
            case 'platforms_logic':
                setPlatformsLogic(q)
                break;
            case 'input_file_format_logic':
                setInputFileFormatLogic(q)
                break;
            case 'output_file_format_logic':
                setOutputFileFormatLogic(q)
                break;
            case 'validation_dataset_logic':
                setValidationDatasetLogic(q)
                break;
            default:
                break;
        }
    };

    // generic code to handle change in logic operator
    const handleClickCheckbox = (event) => {
        let q = ''
        let chk = event.target.checked
        if(chk) {

        } else {
            q = '&' + apiField[event.target.name] + '=true'
        }
        // 8b. add each checkbox field here
        switch (event.target.name){
            case 'fulltext_available':
                setFulltextAvailable(q)
                break;
            case 'verified_account':
                setVerifiedAccount(q)
                break;
            case 'special_interest':
                setSpecialInterest(q)
                break;
            case 'defunct':
                setDefunct(q)
                break;
            case 'graphical_user_interface':
                setGraphicalUserInterface(q)
                break;
            case 'language_independent':
                setLanguageIndependent(q)
                break;
            default:
                break;
        }
    };


    // apply styles to select boxes
    const SelectStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: "#000000",
        }),
        container: provided => ({
            ...provided,
            display: "inline-block",
            width: 300
        })
    };

    // create predicate options
    let multinational_options = []
    let individual_countries_options = []
    for (var c of countriesList){
        if(c.opted_scope){
            if (c["dgraph.type"][0] === 'Multinational'){
                multinational_options[multinational_options.length] = {value: c.uid, label: c.name}
            } else {
                individual_countries_options[individual_countries_options.length] = {value: c.uid, label: c.name}
            }
        }
    }
    // 9. add for each predicate (not async)
    const countries_options = [
        {
            label: "Multinational",
            options: multinational_options
        },
        {
            label: "Country",
            options: individual_countries_options
        }
    ];

    let resources_options = []
    let actors_options = []
    let linking_entities_options = []
    let other_options = []
    let resources = [
        'Archive',
        'Collection',
        'Dataset',
        'LearningMaterial',
        'Tool',
        'ScientificPublication'
    ]
    let actors = [
        'Government',
        'JournalisticBrand',
        'NewsSource',
        'PoliticalParty',
        'Parliament',
        'Person',
        'Organization'
    ]
    let linking_entities = [
        'Channel',
        'ConceptVariable',
        'Countries',
        'Language',
        'MetaVariable',
        'Modality',
        'Multinational',
        'Operation',
        'TextType',
        'Subnational'
    ]

    // function to compare an array of dictionaries
    function compare( a, b ) {
        if ( a.name < b.name ){
            return -1;
        }
        if ( a.name > b.name ){
            return 1;
        }
        return 0;
    }
    entitiesList.sort( compare );

    const labelWithTooltip = (n) => {
        return (
            <Tooltip placement="right" title={<TypeDescription dgraphType={n}/>} arrow>
                <span>{n}</span>
            </Tooltip>
        )
    }

    for (var e of entitiesList){
        if (resources.includes(e.name) ){
            resources_options.push({value: e.name, label: labelWithTooltip(e.name)})
        } else {
            if (actors.includes(e.name) ){
                actors_options.push({value: e.name, label: labelWithTooltip(e.name)})
            } else {
                if (linking_entities.includes(e.name) ){
                    linking_entities_options.push({value: e.name, label: labelWithTooltip(e.name)})
                } else {
                    other_options.push({value: e.name, label: labelWithTooltip(e.name)})
                }
            }
        }
    }
    const entry_type_options = [
        {
            label: "Resources",
            options: resources_options
        },
        {
            label: "Actors & Institutions",
            options: actors_options
        },
        {
            label: "Linking Entities",
            options: linking_entities_options
        },
        {
            label: "Others",
            options: other_options
        }
    ]


    let entity_options = entitiesList.map(function (p) {
        return {value: p.name, label: p.name};
    })

    let channel_options = channelList.map(function (p) {
        return {value: p.uid, label: p.name};
    })

    let languages_options = languagesList.map(function (p) {
        return {value: p.uid, label: p.name};
    })

    let texttypes_options = texttypesList.map(function (p) {
        return {value: p.uid, label: p.name};
    })

    let austria_options = []
    let germany_options = []
    for (var s of subunitsList){
        if (s.country.name === 'Austria'){
            austria_options.push({value: s.uid, label: s.name})
        } else {
            germany_options.push({value: s.uid, label: s.name})
        }
    }
    const subunits_options = [
        {
            label: "Austria",
            options: austria_options
        },
        {
            label: "Germany",
            options: germany_options
        }
    ];
    let country_options = countryList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let concept_variables_options = conceptVariablesList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let modalities_options = modalitiesList.map(function (p) {
        return {value: p.uid, label: p.name};
    })

    let geographic_scope_options = []
    for (const [key, val] of Object.entries(geographicScopeList)) {
        geographic_scope_options.push({value: key, label: val})
    }
    let conditions_of_access_options = []
    for (const [key, val] of Object.entries(conditionsOfAccessList)) {
        conditions_of_access_options.push({value: key, label: val})
    }

    let meta_variables_options = metaVariablesList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let text_units_options = textUnitsList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let date_published_operator_options = datePublishedOperatorList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let party_affiliated_options = []
    for (const [key, val] of Object.entries(partyAffiliatedList)) {
        party_affiliated_options.push({value: key, label: val})
    }
    let ownership_kind_options = []
    for (const [key, val] of Object.entries(ownershipKindList)) {
        ownership_kind_options.push({value: key, label: val})
    }
    let channels_options = channelsList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let methodologies_options = methodologiesList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let datasets_used_options = datasetsUsedList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let publication_kind_options = publicationKindList.map(function (p) {
        return {value: p.value, label: p.name};
    })
    let payment_model_options = []
    for (const [key, val] of Object.entries(paymentModelList)) {
        payment_model_options.push({value: key, label: val})
    }
    let transcript_kind_options = []
    for (const [key, val] of Object.entries(transcriptKindList)) {
        transcript_kind_options.push({value: key, label: val})
    }

    let archive_options = []
    for (var r of reverseSourcesIncludedList){
        archive_options.push({value: r.uid, label: r.name})
    }
    const reverse_sources_included_options = [
        {
            label: "Archive",
            options: archive_options
        }
    ];

    let website_allows_comments_options = []
    for (const [key, val] of Object.entries(websiteAllowsCommentsList)) {
        website_allows_comments_options.push({value: key, label: val})
    }
    let topical_focus_options = topicalFocusList.map(function (p) {
        return {value: p.value, label: p.name};
    })
    let publication_cycle_options = publicationCycleList.map(function (p) {
        return {value: p.value, label: p.name};
    })
    let contains_ads_options = containsAdsList.map(function (p) {
        return {value: p.value, label: p.name};
    })
    let channel_epaper_options = []
    for (const [key, val] of Object.entries(channelEpaperList)) {
        channel_epaper_options.push({value: key, label: val})
    }
    let audience_size_unit_options = audienceSizeUnitList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let audience_size_count_operator_options = audienceSizeCountOperatorList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let audience_size_recent_unit_options = audienceSizeRecentUnitList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let used_for_options = usedForList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let programming_languages_options = programmingLanguagesList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let platforms_options = platformsList.map(function (p) {
        return {value: p.value, label: p.name};
    })
    let open_source_options = []
    for (const [key, val] of Object.entries(openSourceList)) {
        open_source_options.push({value: key, label: val})
    }
    let input_file_format_options = inputFileFormatList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let output_file_format_options = outputFileFormatList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let author_validated_options = []
    for (const [key, val] of Object.entries(authorValidatedList)) {
        author_validated_options.push({value: key, label: val})
    }
    let validation_dataset_options = validationDatasetList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    // end

    // 10. Add for each predicate
    // access to different sections
    const show_sources_included = ["JournalisticBrand", "Dataset", "Archive", "ScientificPublication"]
    const show_subunits = ["JournalisticBrand", "Collection", "NewsSource"]
    const show_country = ["PoliticalParty", "Government", "Parliament", "Organization"]
    const show_name_abbrev = ["PoliticalParty"]
    const show_concept_variables = ["Collection", "Dataset", "Archive", "Tool", "ScientificPublication"]
    const show_modalities = ["Collection", "Dataset", "Archive", "Tool", "ScientificPublication"]
    const show_geographic_scope = ["Dataset", "Archive", "NewsSource", "ScientificPublication", "Government", "Parliament"]
    const show_conditions_of_access = ["Dataset", "Archive", "Tool"]
    const show_fulltext_available = ["Dataset", "Archive"]
    const show_meta_variables = ["Dataset", "Archive"]
    const show_text_units = ["Dataset", "Archive"]
    const show_date_published = ["Dataset", "Tool", "ScientificPublication"]
    const show_date_founded = ["NewsSource", "Organization"]
    const show_party_affiliated = ["NewsSource", "Organization"]
    const show_ownership_kind = ["Organization"]
    const show_channels = ["ScientificPublication"]
    const show_methodologies = ["ScientificPublication"]
    const show_datasets_used = ["ScientificPublication"]
    const show_publication_kind = ["NewsSource"]
    const show_payment_model = ["NewsSource"]
    const show_reverse_sources_included = ["NewsSource"]
    const show_verified_account = ["NewsSource"]
    const show_transcript_kind = ["NewsSource"]
    const show_website_allows_comments = ["NewsSource"]
    const show_special_interest = ["NewsSource"]
    const show_topical_focus = ["NewsSource"]
    const show_publication_cycle = ["NewsSource"]
    const show_contains_ads = ["NewsSource"]
    const show_channel_epaper = ["NewsSource"]
    const show_defunct = ["NewsSource", "Tool"]
    const show_audience_size_unit = ["NewsSource"]
    const show_audience_size_count = ["NewsSource"]
    const show_audience_size_recent_unit = ["NewsSource"]
    const show_used_for = ["Tool"]
    const show_programming_languages = ["Tool"]
    const show_platforms = ["Tool"]
    const show_open_source = ["Tool"]
    const show_graphical_user_interface = ["Tool"]
    const show_language_independent = ["Tool"]
    const show_input_file_format = ["Tool"]
    const show_output_file_format = ["Tool"]
    const show_author_validated = ["Tool"]
    const show_validation_dataset = ["Tool"]
    const show_entries_included = ["Collection"]
    const show_designed_for = ["Tool"]
    const show_subnational = ["Government"]

    const checkDisplay = (ary, ents) => {
        for (var x of ary){
            if (ents.indexOf(x) >= 0){
                return true
            }
        }
        return false
    }

    // 11. Add for each asyncselect
    let sources_included_details = []
    if (searchSourcesIncluded) {
        searchSourcesIncluded.forEach(b => {
            const res = sourcesIncludedDetails.find(c => c.uid === b.uid);
            if (res) {
                let dt = res["dgraph.type"]
                let d = ''
                for (var i = 0; i < dt.length; i++) {
                    if (dt[i] !== 'Entry') {
                        d = dt[i];
                        break;
                    }
                }
                let ch = res.channel
                let chan = ''
                if (ch){
                    chan = ch.name
                }
                let n = chan + ' ' + res.name
                sources_included_details.push({name: n, uid: res.uid, type: d})
            }
        })
    }

    let entries_included_details = []
    if (searchEntriesIncluded) {
        searchEntriesIncluded.forEach(b => {
            const res = entriesIncludedDetails.find(c => c.uid === b.uid);
            if (res) {
                let dt = res["dgraph.type"]
                let d = ''
                for (var i = 0; i < dt.length; i++) {
                    if (dt[i] !== 'Entry') {
                        d = dt[i];
                        break;
                    }
                }
                let ch = res.channel
                let chan = ''
                if (ch){
                    chan = ch.name
                }
                let n = chan + ' ' + res.name
                entries_included_details.push({name: n, uid: res.uid, type: d})
            }
        })
    }

    let designed_for_details = []
    if (searchDesignedFor) {
        searchDesignedFor.forEach(b => {
            const res = designedForDetails.find(c => c.uid === b.uid);
            if (res) {
                let dt = res["dgraph.type"]
                let d = ''
                for (var i = 0; i < dt.length; i++) {
                    if (dt[i] !== 'Entry') {
                        d = dt[i];
                        break;
                    }
                }
                let ch = res.channel
                let chan = ''
                if (ch){
                    chan = ch.name
                }
                let n = chan + ' ' + res.name
                designed_for_details.push({name: n, uid: res.uid, type: d})
            }
        })
    }

    let subnational_details = []
    if (searchSubnational) {
        searchSubnational.forEach(b => {
            const res = subnationalDetails.find(c => c.uid === b.uid);
            if (res) {
                let dt = res["dgraph.type"]
                let d = ''
                for (var i = 0; i < dt.length; i++) {
                    if (dt[i] !== 'Entry') {
                        d = dt[i];
                        break;
                    }
                }
                let ch = res.channel
                let chan = ''
                if (ch){
                    chan = ch.name
                }
                let n = chan + ' ' + res.name
                subnational_details.push({name: n, uid: res.uid, type: d})
            }
        })
    }

    let sources_included_types = ['Organization', 'PoliticalParty', 'NewsSource', 'Person']
    let entries_included_types = ['Dataset', 'Archive', 'NewsSource', 'JournalisticBrand', 'Government', 'Parliament', 'Person' , 'PoliticalParty', 'Organization']
    let designed_for_types = ['Channel', 'Government', 'Parliament', 'Person' , 'PoliticalParty', 'Organization']
    let subnational_types = ['Subnational']

    const toggleExtraFilters = () => {
      if(extraFilters){
          setExtraFilters(false)
      } else {
          setExtraFilters(true)
      }
    }


    const TextStyles = {
        width:150,
        float:"right"
    };

    let isInExtraFilters = false
    for (var s in searchEntities) {
        if (extraFiltersTypes.includes(searchEntities[s].value)) {
            isInExtraFilters = true
        }
    }

    return (
        <>
            <form id="advSearch" onSubmit={handleSubmitAS}>

                <div className='adv_search_field'>
                    <h4>Free-text search</h4>
                    <md-filled-text-field
                        placeholder="Enter keywords..."
                        name="free_text"
                        value={freeText.slice(8)}
                        onBlur={event => {
                            const { value } = event.target;
                            if (value) {
                                setFreeText('&_terms=' + value)
                            } else {
                                setFreeText('')
                            }
                        }}
                    />
                </div>

                <div className='adv_search_field'>
                    <h4>Entry Type</h4>
                    <SearchSelectBox
                        handleChangeEntity={handleChangeEntity}
                        searchOptions={entry_type_options}
                        searchValues={searchEntities}
                    />
                </div>

                <div className='adv_search_field'>
                    <h4>Countries
                        <SearchRadioButtons
                            handleChangeLogic={handleChangeLogic}
                            logic_name={'countries_logic'}
                            current_sel={countriesLogic}
                        />
                    </h4>
                    <SearchSelectBox
                        handleChangeEntity={handleChangeCountries}
                        searchOptions={countries_options}
                        searchValues={searchCountries}
                    />
                </div>

                <div className='adv_search_field'>
                    <h4>Channel</h4>
                    <SearchSelectBox
                        handleChangeEntity={handleChangeChannel}
                        searchOptions={channel_options}
                        searchValues={searchChannel}
                    />
                </div>

                <div className='adv_search_field'>
                    <h4>Languages
                        <SearchRadioButtons
                            handleChangeLogic={handleChangeLogic}
                            logic_name={'languages_logic'}
                            current_sel={languagesLogic}
                        />
                    </h4>
                    <SearchSelectBox
                        handleChangeEntity={handleChangeLanguages}
                        searchOptions={languages_options}
                        searchValues={searchLanguages}
                    />
                </div>

                <div className='adv_search_field'>
                    <h4>Text Types
                        <SearchRadioButtons
                            handleChangeLogic={handleChangeLogic}
                            logic_name={'texttypes_logic'}
                            current_sel={texttypesLogic}
                        />
                    </h4>
                    <SearchSelectBox
                        handleChangeEntity={handleChangeTexttypes}
                        searchOptions={texttypes_options}
                        searchValues={searchTexttypes}
                    />
                </div>

                {checkDisplay(show_sources_included, entities) &&
                    <div className='adv_search_field'>
                        <h4>Sources Included
                            <SearchRadioButtons
                                handleChangeLogic={handleChangeLogic}
                                logic_name={'sources_included_logic'}
                                current_sel={sourcesIncludedLogic}
                            />
                        </h4>
                        {sourcesIncludedDetailsLoaded &&
                            <SearchAsyncSelectBox
                                handleChangeEntity={handleChangeSourcesIncluded}
                                searchValues={sources_included_details}
                                types={sources_included_types}
                            />
                        }
                    </div>
                }

                {checkDisplay(show_used_for, entities) &&
                    <div className='adv_search_field'>
                        <h4>Used For
                            <SearchRadioButtons
                                handleChangeLogic={handleChangeLogic}
                                logic_name={'used_for_logic'}
                                current_sel={usedForLogic}
                            />
                        </h4>
                        <SearchSelectBox
                            handleChangeEntity={handleChangeUsedFor}
                            searchOptions={used_for_options}
                            searchValues={searchUsedFor}
                        />
                    </div>
                }

                {checkDisplay(show_concept_variables, entities) &&
                    <div className='adv_search_field'>
                        <h4>Concept Variables
                            <SearchRadioButtons
                                handleChangeLogic={handleChangeLogic}
                                logic_name={'concept_variables_logic'}
                                current_sel={conceptVariablesLogic}
                            />
                        </h4>
                        <SearchSelectBox
                            handleChangeEntity={handleChangeConceptVariables}
                            searchOptions={concept_variables_options}
                            searchValues={searchConceptVariables}
                        />
                    </div>
                }

                {checkDisplay(show_publication_kind, entities) &&
                    <div className='adv_search_field'>
                        <h4>Publication Kind
                            <SearchRadioButtons
                                handleChangeLogic={handleChangeLogic}
                                logic_name={'publication_kind_logic'}
                                current_sel={publicationKindLogic}
                            />
                        </h4>
                        <SearchSelectBox
                            handleChangeEntity={handleChangePublicationKind}
                            searchOptions={publication_kind_options}
                            searchValues={searchPublicationKind}
                        />
                    </div>
                }

                {checkDisplay(show_geographic_scope, entities) &&
                    <div className='adv_search_field'>
                        <h4>Geographic Scope
                            <SearchRadioButtons
                                handleChangeLogic={handleChangeLogic}
                                logic_name={'geographic_scope_logic'}
                                current_sel={geographicScopeLogic}
                            />
                        </h4>
                        <SearchSelectBox
                            handleChangeEntity={handleChangeGeographicScope}
                            searchOptions={geographic_scope_options}
                            searchValues={searchGeographicScope}
                        />
                    </div>
                }

                {checkDisplay(show_payment_model, entities) &&
                    <div className='adv_search_field'>
                        <h4>Payment Model
                        </h4>
                        <SearchSelectBox
                            handleChangeEntity={handleChangePaymentModel}
                            searchOptions={payment_model_options}
                            searchValues={searchPaymentModel}
                        />
                    </div>
                }

                {checkDisplay(show_ownership_kind, entities) &&
                    <div className='adv_search_field'>
                        <h4>Ownership Kind
                        </h4>
                        <SearchSelectBox
                            handleChangeEntity={handleChangeOwnershipKind}
                            searchOptions={ownership_kind_options}
                            searchValues={searchOwnershipKind}
                        />
                    </div>
                }

                {checkDisplay(show_programming_languages, entities) &&
                    <div className='adv_search_field'>
                        <h4>Programming Languages
                            <SearchRadioButtons
                                handleChangeLogic={handleChangeLogic}
                                logic_name={'programming_languages_logic'}
                                current_sel={programmingLanguagesLogic}
                            />
                        </h4>
                        <SearchSelectBox
                            handleChangeEntity={handleChangeProgrammingLanguages}
                            searchOptions={programming_languages_options}
                            searchValues={searchProgrammingLanguages}
                        />
                    </div>
                }

                {extraFilters &&
                    <>
                        {checkDisplay(show_subunits, entities) &&
                            <div className='adv_search_field'>
                                <h4>Subunits
                                    <SearchRadioButtons
                                        handleChangeLogic={handleChangeLogic}
                                        logic_name={'subunits_logic'}
                                        current_sel={subunitsLogic}
                                    />
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeSubunits}
                                    searchOptions={subunits_options}
                                    searchValues={searchSubunits}
                                />
                            </div>
                        }
                        {checkDisplay(show_name_abbrev, entities) &&
                            <div className='adv_search_field'>
                            <h4>Abbreviated Name</h4>
                            <md-filled-text-field
                                placeholder=""
                                name="name_abbrev"
                                value={nameAbbrev.slice(13)}
                                onBlur={event => {
                                    const {value} = event.target;
                                    if (value) {
                                    setNameAbbrev('&name_abbrev=' + value)
                                    } else {
                                        setNameAbbrev('')
                                    }
                                }}
                            />
                            </div>
                        }

                        {checkDisplay(show_country, entities) &&
                            <div className='adv_search_field'>
                            <h4>Country
                            </h4>
                            <SearchSelectBox
                            handleChangeEntity={handleChangeCountry}
                            searchOptions={country_options}
                            searchValues={searchCountry}
                            />
                            </div>
                        }

                        {checkDisplay(show_subnational, entities) &&
                            <div className='adv_search_field'>
                                <h4>Subnational
                                    <SearchRadioButtons
                                        handleChangeLogic={handleChangeLogic}
                                        logic_name={'subnational_logic'}
                                        current_sel={subnationalLogic}
                                    />
                                </h4>
                                {subnationalDetailsLoaded &&
                                    <SearchAsyncSelectBox
                                        handleChangeEntity={handleChangeSubnational}
                                        searchValues={subnational_details}
                                        types={subnational_types}
                                    />
                                }
                            </div>
                        }

                        {checkDisplay(show_entries_included, entities) &&
                            <div className='adv_search_field'>
                                <h4>Entries Included
                                    <SearchRadioButtons
                                        handleChangeLogic={handleChangeLogic}
                                        logic_name={'entries_included_logic'}
                                        current_sel={entriesIncludedLogic}
                                    />
                                </h4>
                                {entriesIncludedDetailsLoaded &&
                                    <SearchAsyncSelectBox
                                        handleChangeEntity={handleChangeEntriesIncluded}
                                        searchValues={entries_included_details}
                                        types={entries_included_types}
                                    />
                                }
                            </div>
                        }

                        {checkDisplay(show_modalities, entities) &&
                            <div className='adv_search_field'>
                            <h4>Modalities
                            <SearchRadioButtons
                                handleChangeLogic={handleChangeLogic}
                                logic_name={'modalities_logic'}
                                current_sel={modalitiesLogic}
                            />
                            </h4>
                            <SearchSelectBox
                                handleChangeEntity={handleChangeModalities}
                                searchOptions={modalities_options}
                                searchValues={searchModalities}
                            />
                            </div>
                        }

                        {checkDisplay(show_conditions_of_access, entities) &&
                            <div className='adv_search_field'>
                                <h4>Conditions of Access
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeConditionsOfAccess}
                                    searchOptions={conditions_of_access_options}
                                    searchValues={searchConditionsOfAccess}
                                />
                            </div>
                        }

                        {checkDisplay(show_fulltext_available, entities) &&
                            <div className='adv_search_field'>
                                <h4>
                                    Fulltext Available
                                </h4>
                                <SearchCheckbox
                                    handleClick={handleClickCheckbox}
                                    name={'fulltext_available'}
                                    val={true}
                                    chk={initialFulltextAvailableChk}
                                />
                            </div>
                        }

                        {checkDisplay(show_meta_variables, entities) &&
                            <div className='adv_search_field'>
                                <h4>Meta Variables
                                    <SearchRadioButtons
                                        handleChangeLogic={handleChangeLogic}
                                        logic_name={'meta_variables_logic'}
                                        current_sel={metaVariablesLogic}
                                    />
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeMetaVariables}
                                    searchOptions={meta_variables_options}
                                    searchValues={searchMetaVariables}
                                />
                            </div>
                        }

                        {checkDisplay(show_text_units, entities) &&
                            <div className='adv_search_field'>
                                <h4>Text Units
                                    <SearchRadioButtons
                                        handleChangeLogic={handleChangeLogic}
                                        logic_name={'text_units_logic'}
                                        current_sel={textUnitsLogic}
                                    />
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeTextUnits}
                                    searchOptions={text_units_options}
                                    searchValues={searchTextUnits}
                                />
                            </div>
                        }

                        {checkDisplay(show_verified_account, entities) &&
                            <div className='adv_search_field'>
                                <h4>
                                    Verified Account
                                </h4>
                                <SearchCheckbox
                                    handleClick={handleClickCheckbox}
                                    name={'verified_account'}
                                    val={true}
                                    chk={initialVerifiedAccountChk}
                                />
                            </div>
                        }

                        {checkDisplay(show_transcript_kind, entities) &&
                            <div className='adv_search_field'>
                                <h4>Transcript Kind
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeTranscriptKind}
                                    searchOptions={transcript_kind_options}
                                    searchValues={searchTranscriptKind}
                                />
                            </div>
                        }

                        {checkDisplay(show_website_allows_comments, entities) &&
                        <div className='adv_search_field'>
                            <h4>Website Allows Comments
                            </h4>
                            <SearchSelectBox
                                handleChangeEntity={handleChangeWebsiteAllowsComments}
                                searchOptions={website_allows_comments_options}
                                searchValues={searchWebsiteAllowsComments}
                            />
                        </div>
                        }

                        {checkDisplay(show_date_founded, entities) &&
                            <div className='adv_search_field'>
                                <h4>Date Founded</h4>
                                <md-filled-text-field
                                    placeholder=""
                                    name="date_founded"
                                    value={dateFounded.slice(14)}
                                    onBlur={event => {
                                        const {value} = event.target;
                                        if (value) {
                                            setDateFounded('&date_founded=' + value)
                                        } else {
                                            setDateFounded('')
                                        }
                                    }}
                                />
                            </div>
                        }

                        {checkDisplay(show_special_interest, entities) &&
                            <div className='adv_search_field'>
                                <h4>
                                    Special Interest Publication
                                </h4>
                                <SearchCheckbox
                                    handleClick={handleClickCheckbox}
                                    name={'special_interest'}
                                    val={true}
                                    chk={initialSpecialInterestChk}
                                />
                            </div>
                        }

                        {checkDisplay(show_topical_focus, entities) &&
                            <div className='adv_search_field'>
                                <h4>Topical Focus
                                    <SearchRadioButtons
                                        handleChangeLogic={handleChangeLogic}
                                        logic_name={'topical_focus_logic'}
                                        current_sel={topicalFocusLogic}
                                    />
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeTopicalFocus}
                                    searchOptions={topical_focus_options}
                                    searchValues={searchTopicalFocus}
                                />
                            </div>
                        }

                        {checkDisplay(show_publication_cycle, entities) &&
                            <div className='adv_search_field'>
                                <h4>Publication Cycle
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangePublicationCycle}
                                    searchOptions={publication_cycle_options}
                                    searchValues={searchPublicationCycle}
                                />
                            </div>
                        }
                        {checkDisplay(show_contains_ads, entities) &&
                            <div className='adv_search_field'>
                                <h4>Contains Ads
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeContainsAds}
                                    searchOptions={contains_ads_options}
                                    searchValues={searchContainsAds}
                                />
                            </div>
                        }

                        {checkDisplay(show_channel_epaper, entities) &&
                            <div className='adv_search_field'>
                                <h4>E-paper Available
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeChannelEpaper}
                                    searchOptions={channel_epaper_options}
                                    searchValues={searchChannelEpaper}
                                />
                            </div>
                        }

                        {checkDisplay(show_party_affiliated, entities) &&
                            <div className='adv_search_field'>
                                <h4>Party Affiliated
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangePartyAffiliated}
                                    searchOptions={party_affiliated_options}
                                    searchValues={searchPartyAffiliated}
                                />
                            </div>
                        }

                        {checkDisplay(show_defunct, entities) &&
                            <div className='adv_search_field'>
                                <h4>
                                    Defunct
                                </h4>
                                <SearchCheckbox
                                    handleClick={handleClickCheckbox}
                                    name={'defunct'}
                                    val={true}
                                    chk={initialDefunctChk}
                                />
                            </div>
                        }

                        {checkDisplay(show_date_published, entities) &&
                            <div className='adv_search_field'>
                                <h4>Year of Publication</h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeDatePublishedOperator}
                                    searchOptions={date_published_operator_options}
                                    searchValues={searchDatePublishedOperator}
                                    multi={false}
                                    req={false}
                                    special={true}
                                />
                                <div style={TextStyles}>
                                    <md-filled-text-field
                                        placeholder=""
                                        name="date_published"
                                        value={datePublished.slice(16)}
                                        onBlur={event => {
                                            const {value} = event.target;
                                            if (value) {
                                                setDatePublished('&date_published=' + value)
                                            } else {
                                                setDatePublished('')
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        }

                        {checkDisplay(show_methodologies, entities) &&
                            <div className='adv_search_field'>
                                <h4>Methodologies
                                    <SearchRadioButtons
                                        handleChangeLogic={handleChangeLogic}
                                        logic_name={'methodologies_logic'}
                                        current_sel={methodologiesLogic}
                                    />
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeMethodologies}
                                    searchOptions={methodologies_options}
                                    searchValues={searchMethodologies}
                                />
                            </div>
                        }

                        {checkDisplay(show_datasets_used, entities) &&
                            <div className='adv_search_field'>
                                <h4>Datasets Used
                                    <SearchRadioButtons
                                        handleChangeLogic={handleChangeLogic}
                                        logic_name={'datasets_used_logic'}
                                        current_sel={datasetsUsedLogic}
                                    />
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeDatasetsUsed}
                                    searchOptions={datasets_used_options}
                                    searchValues={searchDatasetsUsed}
                                />
                            </div>
                        }

                        {checkDisplay(show_audience_size_unit, entities) &&
                            <div className='adv_search_field'>
                                <h4>Audience Size: Unit
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeAudienceSizeUnit}
                                    searchOptions={audience_size_unit_options}
                                    searchValues={searchAudienceSizeUnit}
                                />
                            </div>
                        }

                        {checkDisplay(show_audience_size_count, entities) &&
                            <div className='adv_search_field'>
                                <h4>Audience Size: Count</h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeAudienceSizeCountOperator}
                                    searchOptions={audience_size_count_operator_options}
                                    searchValues={searchAudienceSizeCountOperator}
                                    multi={false}
                                    req={false}
                                    special={true}
                                />
                                <div style={TextStyles}>
                                    <md-filled-text-field
                                        placeholder=""
                                        name="audience_size_count"
                                        value={audienceSizeCount.slice(21)}
                                        onBlur={event => {
                                            const {value} = event.target;
                                            if (value) {
                                                setAudienceSizeCount('&audience_size|count=' + value)
                                            } else {
                                                setAudienceSizeCount('')
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        }

                        {checkDisplay(show_audience_size_recent_unit, entities) &&
                            <div className='adv_search_field'>
                                <h4>Audience Size Recent: Unit
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeAudienceSizeRecentUnit}
                                    searchOptions={audience_size_recent_unit_options}
                                    searchValues={searchAudienceSizeRecentUnit}
                                />
                            </div>
                        }

                        {checkDisplay(show_platforms, entities) &&
                            <div className='adv_search_field'>
                                <h4>Platforms
                                    <SearchRadioButtons
                                        handleChangeLogic={handleChangeLogic}
                                        logic_name={'platforms_logic'}
                                        current_sel={platformsLogic}
                                    />
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangePlatforms}
                                    searchOptions={platforms_options}
                                    searchValues={searchPlatforms}
                                />
                            </div>
                        }

                        {checkDisplay(show_open_source, entities) &&
                            <div className='adv_search_field'>
                                <h4>Open Source
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeOpenSource}
                                    searchOptions={open_source_options}
                                    searchValues={searchOpenSource}
                                />
                            </div>
                        }

                        {checkDisplay(show_graphical_user_interface, entities) &&
                            <div className='adv_search_field'>
                                <h4>
                                    Graphical User Interface
                                </h4>
                                <SearchCheckbox
                                    handleClick={handleClickCheckbox}
                                    name={'graphical_user_interface'}
                                    val={true}
                                    chk={initialGraphicalUserInterfaceChk}
                                />
                            </div>
                        }

                        {checkDisplay(show_designed_for, entities) &&
                            <div className='adv_search_field'>
                                <h4>Designed For
                                    <SearchRadioButtons
                                        handleChangeLogic={handleChangeLogic}
                                        logic_name={'designed_for_logic'}
                                        current_sel={designedForLogic}
                                    />
                                </h4>
                                {designedForDetailsLoaded &&
                                    <SearchAsyncSelectBox
                                        handleChangeEntity={handleChangeDesignedFor}
                                        searchValues={designed_for_details}
                                        types={designed_for_types}
                                    />
                                }
                            </div>
                        }

                        {checkDisplay(show_language_independent, entities) &&
                            <div className='adv_search_field'>
                                <h4>
                                    Language Independent
                                </h4>
                                <SearchCheckbox
                                    handleClick={handleClickCheckbox}
                                    name={'language_independent'}
                                    val={true}
                                    chk={initialLanguageIndependentChk}
                                />
                            </div>
                        }

                        {checkDisplay(show_input_file_format, entities) &&
                            <div className='adv_search_field'>
                                <h4>Input File Format
                                    <SearchRadioButtons
                                        handleChangeLogic={handleChangeLogic}
                                        logic_name={'input_file_format_logic'}
                                        current_sel={inputFileFormatLogic}
                                    />
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeInputFileFormat}
                                    searchOptions={input_file_format_options}
                                    searchValues={searchInputFileFormat}
                                />
                            </div>
                        }

                        {checkDisplay(show_output_file_format, entities) &&
                            <div className='adv_search_field'>
                                <h4>Output File Format
                                    <SearchRadioButtons
                                        handleChangeLogic={handleChangeLogic}
                                        logic_name={'output_file_format_logic'}
                                        current_sel={outputFileFormatLogic}
                                    />
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeOutputFileFormat}
                                    searchOptions={output_file_format_options}
                                    searchValues={searchOutputFileFormat}
                                />
                            </div>
                        }

                        {checkDisplay(show_author_validated, entities) &&
                            <div className='adv_search_field'>
                                <h4>Author Validated
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeAuthorValidated}
                                    searchOptions={author_validated_options}
                                    searchValues={searchAuthorValidated}
                                />
                            </div>
                        }

                        {checkDisplay(show_validation_dataset, entities) &&
                            <div className='adv_search_field'>
                                <h4>Validation Dataset
                                    <SearchRadioButtons
                                        handleChangeLogic={handleChangeLogic}
                                        logic_name={'validation_dataset_logic'}
                                        current_sel={validationDatasetLogic}
                                    />
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeValidationDataset}
                                    searchOptions={validation_dataset_options}
                                    searchValues={searchValidationDataset}
                                />
                            </div>
                        }

                        {checkDisplay(show_reverse_sources_included, entities) &&
                            <div className='adv_search_field'>
                                <h4>News source included in these resources
                                    <SearchRadioButtons
                                        handleChangeLogic={handleChangeLogic}
                                        logic_name={'reverse_sources_included_logic'}
                                        current_sel={reverseSourcesIncludedLogic}
                                    />
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeReverseSourcesIncluded}
                                    searchOptions={reverse_sources_included_options}
                                    searchValues={searchReverseSourcesIncluded}
                                />
                            </div>
                        }

                        {checkDisplay(show_channels, entities) &&
                            <div className='adv_search_field'>
                                <h4>Channels
                                    <SearchRadioButtons
                                        handleChangeLogic={handleChangeLogic}
                                        logic_name={'channels_logic'}
                                        current_sel={channelsLogic}
                                    />
                                </h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeChannels}
                                    searchOptions={channels_options}
                                    searchValues={searchChannels}
                                />
                            </div>
                        }

                    </>
                }

                <div style={{clear:"both", "marginBottom":20}}>
                    <md-filled-button id="submitForm" type="submit">Search</md-filled-button>&nbsp;
                    {extraFilters && isInExtraFilters &&
                        <md-text-button type="button" onClick={() => toggleExtraFilters()}>Hide Extra
                            Filters</md-text-button>
                    }
                    {!extraFilters && isInExtraFilters &&
                        <md-text-button type="button" onClick={() => toggleExtraFilters()}>Show Extra
                            Filters</md-text-button>
                    }
                </div>

            </form>
        </>
    )
}

export default AdvancedSearchForm;