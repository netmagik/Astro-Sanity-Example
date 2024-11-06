import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        defineField({
        name: 'name',
        title: 'Name',
        type: 'string',
        }),
        defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        validation: (Rule) => Rule.required(),
        options: {
            source: 'name',
            maxLength: 96,
        },
        }),
        defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
            hotspot: true,
            aiAssist: {
            imageDescriptionField: 'alt',
            },
        },
        fields: [
            {
            name: "alt",
            type: "string",
            title: "Alternative Text",
            //required
            validation: Rule => Rule.required(),
            },
        ],
    
        }),
        defineField({
        name: 'bio',
        title: 'Bio',
        type: 'text',
        rows: 4,
        }),
    ],
    })