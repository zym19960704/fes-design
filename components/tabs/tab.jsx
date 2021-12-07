import { computed, defineComponent, inject } from 'vue';
import getPrefixCls from '../_util/getPrefixCls';
import { TABS_INJECTION_KEY } from '../_util/constants';
import { tabProps } from './helper';
import CloseCircleFilled from '../icon/CloseCircleFilled';

const prefixCls = getPrefixCls('tabs');

export default defineComponent({
    components: { CloseCircleFilled },
    props: tabProps,
    setup(props, ctx) {
        const {
            valueRef,
            closableRef,
            isCard,
            handleTabClick,
            handleClose,
        } = inject(TABS_INJECTION_KEY);

        const mergeClosable = computed(() => {
            if (!isCard.value) return;
            return props.closable != null ? props.closable : closableRef.value;
        });

        function handleClick() {
            if (props.disabled) return;
            handleTabClick(props.value);
        }

        /**
         * @param {Event} event
         */
        function handleCloseClick(event) {
            event.stopPropagation();
            handleClose(props.value);
        }

        return () => {
            const defaultSlot = ctx.slots.default;
            return (
                <div
                    key={props.value}
                    onClick={ handleClick }
                    class={{
                        [`${prefixCls}-tab`]: true,
                        [`${prefixCls}-tab-card`]: isCard.value,
                        [`${prefixCls}-tab-active`]: valueRef.value === props.value,
                        [`${prefixCls}-tab-disabled`]: props.disabled,
                    }}>
                    <div class={`${prefixCls}-tab-label`}>{ defaultSlot ? defaultSlot() : props.name }</div>
                    { mergeClosable.value && <div class={`${prefixCls}-tab-close`}><CloseCircleFilled onClick={handleCloseClick}/></div> }
                </div>
            );
        };
    },
});
