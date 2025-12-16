import emailjs from "@emailjs/browser";
export default async function sendConfirmation(
    userName: string,
    userEmail: string,
    id: string
): Promise<boolean> {
    try {
        await emailjs.send(
        "service_b4cwkhf",
        "template_sgjzzeu",
        { user_name: userName, user_email: userEmail, id },
        "b9hTKBN3fLX9sV6_Y"
        );

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}