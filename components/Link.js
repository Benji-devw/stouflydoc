import Link from 'next/link';

// export { NextLink };

export default function NextLink({ href, children, ...props }) {
    return (
        <Link href={href}>
            <a {...props}>
                {children}
            </a>
        </Link>
    );
}