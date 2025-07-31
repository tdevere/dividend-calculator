export class CodeGenerator {
    constructor(private templates: Record<string, string>) {}

    generateComponent(name: string): string {
        const template = this.templates['component.template.tsx'];
        return template.replace(/__COMPONENT_NAME__/g, name);
    }

    generateHook(name: string): string {
        const template = this.templates['hook.template.ts'];
        return template.replace(/__HOOK_NAME__/g, name);
    }

    generateTest(name: string): string {
        const template = this.templates['test.template.spec.ts'];
        return template.replace(/__TEST_NAME__/g, name);
    }

    generateApi(name: string): string {
        const template = this.templates['api.template.ts'];
        return template.replace(/__API_NAME__/g, name);
    }
}