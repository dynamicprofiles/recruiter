
export interface Mail {
    ID: number;
    from_user_email: string;
    to_user_email: string;
    public_profile_random_number: string;
    profile_id: number,
    subject: string;
    email_text: string;
    created_at : string;
}
