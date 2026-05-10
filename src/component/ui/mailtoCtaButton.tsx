import MailOutlineIcon from "@mui/icons-material/MailOutline";

type MailtoCtaButtonProps = {
    href: string;
    label: string;
};

export default function MailtoCtaButton({ href, label }: MailtoCtaButtonProps) {
    return (
        <a
            href={href}
            className="inline-flex font-['Press_Start_2P'] text-xs md:text-sm bg-[#27945c] text-white border-4 border-[#0d1b21] px-6 py-3 shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1 no-underline items-center gap-2"
        >
            <MailOutlineIcon fontSize="small" /> {label}
        </a>
    );
}
