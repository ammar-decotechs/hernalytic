

export interface obserActivities{
    firstname:string,
    lastname:string,
    survey_not_submitted:number,
    survey_submitted:number,
    user_id:number
}

export interface partnerDonwload{
    firstname:string,
    lastname:string,
    partner_id:number,
    survey_downloaded:number
}

export interface recentSurveys{
    caption:string,
    published:true,
    description:string,
    completion_date:string,
    completion_time:string,
    id:number,
    survey_status:string
}

export interface survey{
    caption:string,
    completion_date:string,
    completion_time:string,
    description:string,
    id:number,
    published:boolean
}