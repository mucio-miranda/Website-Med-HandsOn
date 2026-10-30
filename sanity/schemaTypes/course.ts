import { defineField, defineType } from 'sanity'
import { getYouTubeId } from '../../src/lib/youtube'

export default defineType({
  name: 'course',
  title: 'Cursos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Curso',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL do curso)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem de Capa (Hero)',
      type: 'image',
      description: 'Imagem que aparece no topo da página do curso',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cardImage',
      title: 'Imagem do Card (Listagem)',
      type: 'image',
      description: 'Imagem que aparece na lista de cursos (/cursos). Se não preencher, usa a imagem de capa.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrição Curta (para o Card)',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Descrição Completa (Sobre o Curso)',
      type: 'array',
      description: 'Use o botão "+" para inserir imagens ou vídeos do YouTube no meio do texto.',
      of: [
        { type: 'block' },
        {
          type: 'image',
          title: 'Imagem',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
              description: 'Descreva a imagem (acessibilidade e SEO).',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Legenda',
            },
          ],
        },
        {
          type: 'object',
          name: 'youtube',
          title: 'Vídeo do YouTube',
          fields: [
            defineField({
              name: 'url',
              title: 'Link do Vídeo',
              type: 'url',
              description: 'Cole o link do vídeo (ex: https://www.youtube.com/watch?v=... ou https://youtu.be/...)',
              validation: (rule) =>
                rule.required().custom((url) =>
                  !url || getYouTubeId(url) ? true : 'Link do YouTube inválido'
                ),
            }),
          ],
          preview: {
            select: { url: 'url' },
            prepare: ({ url }) => ({
              title: 'Vídeo do YouTube',
              subtitle: url,
            }),
          },
        },
      ],
    }),
    // Informações básicas
    defineField({
      name: 'startDate',
      title: 'Data de Início',
      type: 'string',
      placeholder: 'ex: Em breve, ou 20 de Outubro',
    }),
    defineField({
      name: 'duration',
      title: 'Duração',
      type: 'string',
      placeholder: 'ex: 4 semanas',
    }),
    defineField({
      name: 'location',
      title: 'Localização',
      type: 'string',
      placeholder: 'ex: Recife, PE',
    }),
    defineField({
      name: 'price',
      title: 'Preço (em R$)',
      type: 'number',
    }),
    defineField({
      name: 'installments',
      title: 'Parcelamento (Texto)',
      type: 'string',
      placeholder: 'ex: ou 12x de R$ 599,70',
    }),
    defineField({
      name: 'mentalTrigger',
      title: 'Gatilho Mental (Urgência)',
      type: 'string',
      description: 'Texto que aparece acima do preço (ex: "Vagas limitadas.", "Última turma de 2024!", "Apenas 5 vagas!")',
      placeholder: 'ex: Vagas limitadas.',
    }),
    defineField({
      name: 'enrollmentLink',
      title: 'Link de Inscrição (Botão)',
      type: 'url',
      description: 'Link externo para pagamento ou formulário (ex: Hotmart, Eduzz, WhatsApp)',
      validation: (rule) => rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
    }),

    // Instrutor (Inline)
    defineField({
      name: 'instructor',
      title: 'Instrutor',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Nome', type: 'string' }),
        defineField({ name: 'role', title: 'Cargo/Especialidade', type: 'string' }),
        defineField({ name: 'bio', title: 'Biografia Curta', type: 'text', rows: 3 }),
        defineField({ name: 'image', title: 'Foto do Instrutor', type: 'image', options: { hotspot: true } }),
      ],
    }),

    // Diferenciais (Lista de texto)
    defineField({
      name: 'features',
      title: 'Diferenciais do Curso',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    // Patrocinadores (Logos na barra lateral)
    defineField({
      name: 'sponsors',
      title: 'Patrocinadores',
      type: 'array',
      description: 'Logos exibidos na barra lateral, abaixo do card de preço.',
      of: [
        {
          type: 'object',
          title: 'Patrocinador',
          fields: [
            defineField({
              name: 'name',
              title: 'Nome',
              type: 'string',
              description: 'Usado como texto alternativo do logo.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              description: 'Recomendado: PNG com fundo transparente, recortado sem margens, com pelo menos 400px de largura.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Site do Patrocinador (opcional)',
              type: 'url',
              validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
            },
          },
        },
      ],
    }),

    // Conteúdo Programático (Módulos flexíveis)
    defineField({
      name: 'modules',
      title: 'Conteúdo Programático',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Módulo',
          fields: [
            defineField({
              name: 'title',
              title: 'Título do Módulo',
              type: 'string',
              placeholder: 'ex: Módulo Teórico',
            }),
            defineField({
              name: 'topics',
              title: 'Tópicos',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
        },
      ],
    }),

    // Campos de SEO
    defineField({
      name: 'seoTitle',
      title: 'Título SEO (Meta Title)',
      type: 'string',
      description: 'Título otimizado para motores de busca (50-60 caracteres). Se não preencher, usa o título do curso.',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Descrição para Google (150-160 caracteres). Se não preencher, usa a descrição curta.',
      validation: (rule) => rule.max(160),
      rows: 3,
    }),
    defineField({
      name: 'keywords',
      title: 'Palavras-chave (Keywords)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Palavras-chave relacionadas ao curso para SEO',
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
