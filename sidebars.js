module.exports = {
    mainSidebar: [
    ],
    get_started: [
        'get_started/intro',
        'get_started/al_project_architecture',
        'get_started/installation',
        'get_started/beginners_guide',
        {
            label: 'Interview projects',
            collapsed: false,
            type: 'category',
            items: [
                'get_started/plan_interview',
                'get_started/project_management',
                'get_started/search_engine_optimization',
                'get_started/landing_pages',
            ],
        },
        'get_started/resources',
        {
            "type": "link",
            "label": "Developer documentation",
            "href": "/docs/overview",
            "description": "View developer documentation"
        },
        {
            label: 'Volunteer',
            type: 'category',
            items: [
                'volunteer/sign_up',
                'volunteer/volunteer_flows',
            ]
        },
        'get_started/development_roadmap',
        'contributors',
        {
            label: 'Archived pages',
            type: 'category',
            items: [
                'archive/bootcamp',
                'archive/working_with_teams',
            ],
        },
        'get_started/community_practices',
    ],
    docs: [
        'overview',
        {
            label: 'Introduction to Docassemble',
            type: 'category',
            items: [
                'docassemble_intro/introduction-to-docassemble',
                'docassemble_intro/practical-guide-docassemble',
                'docassemble_intro/hello-world',
                'docassemble_intro/logic',
                'docassemble_intro/working-with-docx',
                'docassemble_intro/controlling-interview-order',
                'docassemble_intro/basic-troubleshooting',
                {
                    type: "category",
                    label: "Docassemble syntax",
                    items: [
                        'docassemble_intro/yaml',
                        'docassemble_intro/markdown',
                        'docassemble_intro/mako',
                        'docassemble_intro/python',
                        'docassemble_intro/jinja2',
                    ]
                },
                {
                    type: "category",
                    label: "Working with lists and objects",
                    items: [
                        'docassemble_intro/object-oriented-programming',
                        'docassemble_intro/repeated-information',
                    ]
                },
                {
                    type: 'category',
                    label: 'Administering Docassemble',
                    items: [
                        'admin_guide_docassemble/setup-server',
                        'admin_guide_docassemble/rebuild-lightsail-instance',
                        'admin_guide_docassemble/running-docassemble-without-aws',
                        'admin_guide_docassemble/run-docassemble-docker-vscode',
                        //'admin_guide_docassemble/combining-interviews',
                        'admin_guide_docassemble/installing-production-app',
                        'admin_guide_docassemble/updates-and-maintenance',
                    ],
                },
            ]
        },
        {
            label: 'Authoring interviews',
            type: 'category',
            items: [
                'authoring/pdf_templates',
                'authoring/docx_templates',
                'authoring/dynamic_phrasing_based_on_values',
                'authoring/document_variables_reference',
                'authoring/name_formats',
                'authoring/alweaver_overview',
                'authoring/github',
                'authoring/customizing_interview',
                'authoring/writing_review_screen',
                'authoring/yaml_anatomy',
                {
                    label: 'Coding with AI assistance',
                    type: 'category',
                    items: [
                        'authoring/authoring_with_ai',
                        'authoring/ai_mcp_and_rest',
                        'authoring/ai_checklist_project_setup',
                        'authoring/ai_checklist_field_labeling',
                        'authoring/ai_checklist_weaver_editing',
                        'authoring/ai_checklist_quality_publish',
                    ],
                },
            ],
        },
        {
            label: 'Writing good questions',
            type: 'category',
            items: [
                'style_guide/question_style_overview',
                'style_guide/style_guide_respect',
                // 'style_guide/question_style_sensitivities',
                'style_guide/style_guide_readability',
                'style_guide/question_style_structure',
                'style_guide/question_style_exit_screen',
                'style_guide/question_style_navigation',
                'style_guide/question_style_organize_fields',
                'style_guide/question_style_help_your_user',
                'style_guide/style_guide_formatting',
                'style_guide/question_style_validation',
                'style_guide/sms_style_guidelines',
                {
                    label: 'Question library',
                    type: 'category',
                    items: [
                        'style_guide/question_library/ql_names',
                        'style_guide/question_library/ql_addresses',
                        'style_guide/question_library/ql_gender',
                        'style_guide/question_library/ql_pronouns',
                        'style_guide/question_library/ql_language',
                        'style_guide/question_library/ql_terms_of_use',
                    ]
                },
            ]
        },
        {
            label: 'Coding style guide',
            type: 'category',
            items: [
                'coding_style/coding_style_overview',
                'coding_style/python',
                'coding_style/yaml',
                'coding_style/yaml_structure',
                'coding_style/yaml_dynamic',
                'coding_style/yaml_interface',
                'coding_style/yaml_translation',
                'coding_style/defense',
                'coding_style/accessibility'
            ]
        },
        {
            "type": "html",
            "value": "Assembly Line components",
            "className": "sidebar-heading",
            "defaultStyle": true
        },
        {
            "type": "category",
            "label": "AssemblyLine",
            "items": [
                'components/AssemblyLine/al_general_overview',
                'components/AssemblyLine/al_document_overview',
                'components/AssemblyLine/al_reminders_overview',
                {
                    label: 'Answer sets',
                    type: 'category',
                    items: [
                        'components/AssemblyLine/answer_sets',
                        'components/AssemblyLine/answer_set_intakes',
                    ]
                },
                'components/AssemblyLine/magic_variables',
                'components/AssemblyLine/reserved_keywords',
                'components/AssemblyLine/navigation',
                'components/AssemblyLine/translation',
                'components/AssemblyLine/error_actions',
                'components/AssemblyLine/background_assembly',
                "components/AssemblyLine/signatures",
                "components/AssemblyLine/al_general",
                "components/AssemblyLine/al_courts",
                "components/AssemblyLine/al_document",
                "components/AssemblyLine/language",
                "components/AssemblyLine/sessions",
                "components/AssemblyLine/custom_jinja_filters",
                "components/AssemblyLine/sign",
            ]
        },
        'components/ALRecipes/alrecipes_overview',
        {
            "type": "category",
            "label": "ALToolbox",
            "items": [
                'components/ALToolbox/altoolbox_overview',
                {
                    label: 'ALIncome',
                    type: 'category',
                    items: [
                        'components/ALToolbox/al_income_overview',
                        'components/ALToolbox/al_income_expenses',
                        'components/ALToolbox/al_income_jobs',
                        'components/ALToolbox/al_income_itemizedjobs',
                    ]
                },
                "components/ALToolbox/al_income",
                "components/ALToolbox/business_days",
                "components/ALToolbox/copy_button",
                "components/ALToolbox/misc",
                "components/ALToolbox/save_input_data",
                "components/ALToolbox/llms",
            ]
        },
        'components/ALThemeTemplate/althemetemplate_overview',
        'components/RateMyPDF/ratemypdf_overview',
        'components/GithubFeedbackForm/githubfeedbackform_overview',
        'components/InterviewStats/interviewstats_overview',
        'components/ALDashboard/aldashboard_overview',
        {
            type: 'autogenerated',
            dirName: 'interviews'
        },
        {
            label: 'ALDashboard modules',
            type: 'category',
            items: [
                'components/ALDashboard/aldashboard',
                'components/ALDashboard/create_package',
                'components/ALDashboard/docx_wrangling',
                'components/ALDashboard/package_scanner',
                'components/ALDashboard/project_maintenance',
                'components/ALDashboard/translation',
                'components/ALDashboard/validate_docx',
            ],
        },
        {
            "label": "FormFyxer",
            "type": "category",
            "items": [
                "components/FormFyxer/lit_explorer",
                "components/FormFyxer/docx_wrangling",
                "components/FormFyxer/pdf_wrangling"
            ]
        },
        {
            label: 'E-filing integration (EFSP)',
            type: 'category',
            items: [
                'components/EFSPIntegration/efsp_overview',
                'components/EFSPIntegration/efiling_through_docassemble',
                'components/EFSPIntegration/efiling_case_search',
                'components/EFSPIntegration/efiling_codes',
                'components/EFSPIntegration/efiling_monitoring',
                'components/EFSPIntegration/efiling_api',
                'components/EFSPIntegration/efm_client',
                'components/EFSPIntegration/conversions',
                'components/EFSPIntegration/interview_logic',
                'components/EFSPIntegration/py_efsp_client',
            ]
        },
        {
            label: 'Automated testing (ALKiln)',
            type: 'category',
            items: [
                // WIPs
                'components/ALKiln/alkiln_intro',
                // Old
                'components/ALKiln/alkiln_about',
                'components/ALKiln/alkiln_advanced',
                // WIPs
                'components/ALKiln/alkiln_setup',
                'components/ALKiln/alkiln_writing_tests',
                'components/ALKiln/alkiln_troubleshooting',
                'components/ALKiln/alkiln_security',
                'components/ALKiln/alkiln_deprecated',
            ]
        }
    ]
};
