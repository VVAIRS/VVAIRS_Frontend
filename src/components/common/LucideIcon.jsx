import React from 'react';
import * as Icons from 'lucide-react';
import { Box } from '@mui/material';

export default function LucideIcon({ name, size = 20, color, className, ...rest }) {
    if (!name) return null;

    // Convert k-ebab-case or icon-kebab-case to PascalCase
    // e.g. icon-arrow-right -> ArrowRight
    // e.g. arrow-right -> ArrowRight
    const cleanName = name.replace(/^icon-/, '');
    const pascalName = cleanName.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');

    const Icon = Icons[pascalName];

    if (!Icon) {
        return null;
    }

    // Pass size to the icon directly if supported or via sx
    return <Box component={Icon} size={size} color={color} className={className} {...rest} />;
}
